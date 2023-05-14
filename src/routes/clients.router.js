import { Router } from "express";
import { getClientId, getClients } from "../controllers/clients.controller.js";

const clientsRouter = Router();

clientsRouter.get("/customers", getClients);
clientsRouter.get("/customers/:id", getClientId);

export default clientsRouter;
