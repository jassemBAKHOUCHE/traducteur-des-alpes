/**
 * server.js — Edition “x1000 WOW”, multi-fichiers.
 */

import * as dotenv from "dotenv";
dotenv.config({ path: './.env' });

import express from "express";
import { limiter } from "./middlewares/limiter.js";
import { nonceMiddleware } from "./middlewares/nonce.js";
import { securityHeaders } from "./middlewares/securityHeaders.js";

import { registerPublicRoutes } from "./routes/public.js";
import { registerCommanderRoutes } from "./routes/commander.js";
import { registerMiscRoutes } from "./routes/misc.js";
import { registerNotFound } from "./routes/notFound.js";

const app = express();

app.use("/static", express.static("./static"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(nonceMiddleware);
app.use(securityHeaders);
app.use(limiter);

registerPublicRoutes(app);
registerCommanderRoutes(app);
registerMiscRoutes(app);
registerNotFound(app);

const port = Number(process.env.PORT);
