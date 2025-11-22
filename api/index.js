import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

require("dotenv").config();

import { registerPublicRoutes } from "../routes/public.js";
import { registerCommanderRoutes } from "../routes/commander.js";
import { registerMiscRoutes } from "../routes/misc.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerPublicRoutes(app);
registerCommanderRoutes(app);
registerMiscRoutes(app);

export default app;
