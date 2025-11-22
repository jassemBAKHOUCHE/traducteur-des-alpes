import crypto from "crypto";

export const nonceMiddleware = (req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("base64");
  next();
};
