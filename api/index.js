import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

import express from "express";
import multer from "multer";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { registerPublicRoutes } from "../routes/public.js";
import { registerCommanderRoutes } from "../routes/commander.js";
import { registerMiscRoutes } from "../routes/misc.js";

// --- Fix: multer serverless mode (pas d’écriture disque persistant)
const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Helmet adapté (pas full CSP sinon Vercel bloque)
app.use(helmet({ contentSecurityPolicy: false }));

// --- Rate Limit compatible Serverless
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// 🔧 Routes
registerPublicRoutes(app, upload);
registerCommanderRoutes(app, upload);
registerMiscRoutes(app);

// ⭐ IMPORTANT : ne pas mettre app.listen ici
export default function handler(req, res) {
  return app(req, res);
}
