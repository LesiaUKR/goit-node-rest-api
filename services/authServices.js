// Вбудовані модулі Node.js
import fs from "fs/promises";
import path from "path";

// Зовнішні модулі (npm пакети)
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import sharp from 'sharp';
import { v4 as uuidv4 } from "uuid";

// Власні (локальні) модулі проєкту
import { generateToken } from "../helpers/jwt.js";
import { sendVerificationEmail } from "../helpers/emailService.js";
import User from "../db/models/User.js";

export const findUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

export const createUser = async (userData) => {
  const avatarURL = gravatar.url(userData.email, { s: '250', r: 'pg', d: 'identicon' });
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const verificationToken = uuidv4();

  const user = await User.create({
    ...userData,
     password: hashedPassword,
     avatarURL,
     verificationToken,
  });
   
    // Відправляємо лист для верифікації
  await sendVerificationEmail(userData.email, verificationToken);
  
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

//оновлення аватарки
export const updateAvatar = async (userId, tempUploadPath) => {
  try {
    // Створюємо шляхи до директорій
    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    
    // Створюємо унікальне ім'я файлу
    const filename = `${uuidv4()}.jpg`;
    const avatarPath = path.join(avatarsDir, filename);
    
    // Обробляємо зображення за допомогою sharp
    await sharp(tempUploadPath)
      .resize(250, 250)
      .jpeg({ quality: 90 })
      .toFile(avatarPath);
    
    // Видаляємо тимчасовий файл
    await fs.unlink(tempUploadPath);
    
    // Створюємо URL для аватарки
    const avatarURL = `/avatars/${filename}`;
    
    // Оновлюємо запис у базі даних
    await User.update(
      { avatarURL },
      { where: { id: userId } }
    );
    
    return avatarURL;
  } catch (error) {
    console.error("Error updating avatar:", error);
    throw error;
  }
};

export const verifyEmail = async (verificationToken) => {
  const user = await User.findOne({ where: { verificationToken } });
  if (!user) {
    return null;
  }
  
  await User.update(
    { verificationToken: null, verify: true },
    { where: { id: user.id } }
  );
  
  return user;
};

export const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    return null;
  }
  
  if (user.verify) {
    return { verified: true };
  }
  
  // Створюємо новий токен, якщо старий вже використаний або загублений
  if (!user.verificationToken) {
    const verificationToken = uuidv4();
    await User.update(
      { verificationToken },
      { where: { id: user.id } }
    );
    
    await sendVerificationEmail(email, verificationToken);
    return { sent: true };
  }
  
  await sendVerificationEmail(email, user.verificationToken);
  return { sent: true };
};
