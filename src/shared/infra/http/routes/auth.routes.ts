import { Router } from "express";

import { AuthenticateUserController } from "../../../../modules/Accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/Accounts/useCases/refreshToken/RefreshTokenController";

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authRoutes.post("/sessions", authenticateUserController.handle);

authRoutes.post("/refresh-token", refreshTokenController.handle);

export { authRoutes };
