import { Router } from "express";
import gamesRouter from "./games.router.js";
import clientsRouter from "./clients.router.js";

const routers = Router();
routers.use(gamesRouter);
routers.use(clientsRouter);
export default routers;
