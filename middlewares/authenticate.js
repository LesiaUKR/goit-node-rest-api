import HttpError from "../helpers/HttpError.js";
import User from "../db/models/User.js";
import { verifyToken } from "../helpers/jwt.js";

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Not authorized"));
  }

  const { payload, error } = verifyToken(token);
  
  if (error) {
    return next(HttpError(401, "Not authorized"));
  }

  try {
    const user = await User.findByPk(payload.id);

    if (!user || user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

export default authenticate;