import { Router } from "express";
import { ResetPasswordUserController } from "../../../../modules/Accounts/useCases/resetPasswordUser/ResetPasswordUserController";

import { SendForgotPasswordMailController } from "../../../../modules/Accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);

passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };