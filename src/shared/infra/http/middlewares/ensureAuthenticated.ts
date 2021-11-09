import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../../../modules/Accounts/infra/typeorm/repositories/UsersRepository";
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
    const { sub: userId } = verify(
      token,
      "38558aa5db5cf08625bee50665c73760"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    // Checks if user exists
    const user = usersRepository.findById(userId);

    if (!user) {
      throw new AppError("This user does not exist!", 401);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
