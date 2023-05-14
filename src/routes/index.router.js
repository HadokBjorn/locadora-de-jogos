import { Router } from "express";
import gamesRouter from "./games.router.js";

const routers = Router();
routers.use(gamesRouter);

export default routers;
