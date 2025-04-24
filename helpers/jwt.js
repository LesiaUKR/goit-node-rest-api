import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h",
  });

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return {
      payload,
      error: null,
    };
  } catch (error) {
    return {
      payload: null,
      error,
    };
  }
};