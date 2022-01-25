import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../../config/auth";
import { UsersRepository } from "../../../../modules/Accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../../../modules/Accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "../../../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  // Verifying if it is a valid token
  try {
    const { sub: userId } = verify(token, auth.secretToken) as IPayload;

    request.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
