import fs from "fs/promises";
import path from "path";

import * as authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const register = async (req, res) => {
  const { email, password } = req.body;
  
  const existingUser = await authService.findUserByEmail(email);
  if (existingUser) {
    throw HttpError(409, "Email already in use");
  }
  
  const newUser = await authService.createUser({ email, password });
  
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await authService.findUserByEmail(email);
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  
  const isPasswordValid = await authService.validatePassword(
    password,
    user.password
  );
  if (!isPasswordValid) {
    throw HttpError(401, "Email or password is wrong");
  }
  
  const token = authService.generateUserToken(user.id);
  await authService.updateToken(user.id, token);
  
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  await authService.removeToken(req.user.id);
  res.status(204).send();
};

const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;
  console.log("User object:", req.user);
  console.log("User properties:", Object.keys(req.user));
  res.json({
    email,
     subscription,
     avatarURL
  });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { id } = req.user;
  
  await authService.updateSubscription(id, subscription);
  
  res.json({
    email: req.user.email,
    subscription,
  });
};

// Новий контролер для оновлення аватарки
const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Avatar file is required");
  }
  
  const { id } = req.user;
  const { path: tempUploadPath } = req.file;
  
  const avatarURL = await authService.updateAvatar(id, tempUploadPath);
  
  res.json({ avatarURL });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};