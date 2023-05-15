import { Router } from "express";
import gamesRouter from "./games.router.js";
import clientsRouter from "./clients.router.js";
import rentalsRouter from "./rentals.router.js";

const routers = Router();
routers.use(gamesRouter);
routers.use(clientsRouter);
routers.use(rentalsRouter);
export default routers;
