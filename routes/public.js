import { viewHome } from "../views/viewHome.js";
import { viewServices } from "../views/viewServices.js";

export function registerPublicRoutes(app) {
  app.get("/", (req, res) => res.send(viewHome(res.locals.nonce)));
  app.get("/services", (req, res) => res.send(viewServices(res.locals.nonce)));
}
