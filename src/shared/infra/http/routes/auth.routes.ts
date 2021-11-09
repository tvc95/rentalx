import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/Accounts/useCases/authenticateUser/AuthenticateUserController";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post("/sessions", authenticateUserController.handle);

export { authRoutes };
