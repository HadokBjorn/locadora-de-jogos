import { Router } from "express";
import { createRental, getRentals } from "../controllers/rentals.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import rentalsSchema from "../schemas/rentals.schema.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateSchema(rentalsSchema), createRental);
rentalsRouter.get("/rentals", getRentals);

export default rentalsRouter;
