import express from "express";
import authControllers from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema, subscriptionSchema } from "../schemas/authSchemas.js";
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

// Додаємо новий маршрут для оновлення аватарки
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"), // Використовуємо multer для обробки файлу
  authControllers.updateAvatar
);


export default authRouter;