import bcrypt from "bcrypt";
import { generateToken } from "../helpers/jwt.js";
import User from "../db/models/User.js";

export const findUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

export const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });
  
  return user;
};

export const validatePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateUserToken = (userId) => {
  return generateToken({ id: userId });
};

export const updateToken = async (userId, token) => {
  await User.update(
    { token },
    { where: { id: userId } }
  );
};

export const removeToken = async (userId) => {
  await User.update(
    { token: null },
    { where: { id: userId } }
  );
};

export const updateSubscription = async (userId, subscription) => {
  return User.update(
    { subscription },
    { 
      where: { id: userId },
      returning: true,
    }
  );
};