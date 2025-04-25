import multer from "multer";
import path from "path";

// Налаштування зберігання завантажених файлів
const tempDir = path.join(process.cwd(), "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Фільтр для перевірки типу файлу
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format. Please upload image file."), false);
  }
};

// Створюємо middleware для завантаження
const upload = multer({
  storage: multerConfig,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB максимальний розмір файлу
  },
});

export default upload;