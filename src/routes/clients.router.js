import { Router } from "express";
import {
	createClient,
	getClient,
	getClients,
	updateClient,
} from "../controllers/clients.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import clientSchema from "../schemas/client.schema.js";

const clientsRouter = Router();

clientsRouter.post("/customers", validateSchema(clientSchema), createClient);
clientsRouter.get("/customers", getClients);
clientsRouter.get("/customers/:id", getClient);
clientsRouter.put("/customers/:id", validateSchema(clientSchema), updateClient);

export default clientsRouter;
