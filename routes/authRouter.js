import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema, subscriptionSchema, emailSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js"; 

const authRouter = express.Router();

// Реєстрація
authRouter.post(
  "/register",
  validateBody(registerSchema),
  authControllers.register
);

// Логін
authRouter.post(
  "/login",
  validateBody(loginSchema),
  authControllers.login
);

// Логаут
authRouter.post(
  "/logout",
  authenticate,
  authControllers.logout
);

// Поточний користувач
authRouter.get(
  "/current",
  authenticate,
  authControllers.getCurrent
);

// Оновлення підписки
authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(subscriptionSchema),
  authControllers.updateSubscription
);

// Оновлення аватарки
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"), // Використовуємо multer для обробки файлу
  authControllers.updateAvatar
);

// Верифікація електронної пошти
authRouter.get(
  "/verify/:verificationToken",
  authControllers.verifyEmail
);

// Повторна верифікація електронної пошти
authRouter.post(
  "/verify",
  validateBody(emailSchema),
  authControllers.resendVerificationEmail
);

export default authRouter;