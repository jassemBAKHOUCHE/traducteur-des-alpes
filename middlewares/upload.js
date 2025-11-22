import multer from "multer";

export const upload = multer({
  dest: "./data",
  limits: { fileSize: 10 * 1024 * 1024 }
});
