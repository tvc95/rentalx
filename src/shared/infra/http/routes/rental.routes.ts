import { Router } from "express";

import { CreateRentalController } from "../../../../modules/Rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "../../../../modules/Rentals/useCases/devolutionRental/DevolutionRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };
