import { sign, verify } from "jsonwebtoken";
import { inject } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/Users/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string) {
    const { email, sub } = verify(token, auth.secretRefreshToken) as IPayload;

    const userId = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        userId,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token doesn't exist!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      auth.expiresRefreshTokenDays
    );

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: userId,
      expiresIn: auth.expiresInRefreshToken,
    });

    await this.usersTokensRepository.create({
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
      userId,
    });

    return refreshToken;
  }
}

export { RefreshTokenUseCase };
