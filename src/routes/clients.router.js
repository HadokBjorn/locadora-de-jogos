import { Router } from "express";
import { getClients } from "../controllers/clients.controller.js";

const clientsRouter = Router();

clientsRouter.get("/customers", getClients);

export default clientsRouter;
