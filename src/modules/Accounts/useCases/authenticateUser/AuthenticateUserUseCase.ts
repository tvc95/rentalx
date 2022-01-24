import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/Users/IUsersTokensRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    admin: boolean;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verificar se o usuário existe
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    const {
      expiresIn,
      secretRefreshToken,
      secretToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = auth;

    if (!userAlreadyExists) {
      throw new AppError("E-mail or password incorrect!");
    }

    // Decriptar a senha para identificar se o usuário colocou a senha corretamente
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new AppError("E-mail or password incorrect!");
    }

    // Gerar um token de autenticação, caso a senha esteja correta
    const token = sign({}, secretToken, {
      subject: userAlreadyExists.id,
      expiresIn,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: userAlreadyExists.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokExpireDate = this.dayjsDateProvider.addDays(
      expiresRefreshTokenDays
    );

    await this.usersTokensRepository.create({
      expiresDate: refreshTokExpireDate,
      refreshToken,
      userId: userAlreadyExists.id,
    });

    return {
      user: {
        name: userAlreadyExists.name,
        admin: userAlreadyExists.admin,
        email: userAlreadyExists.email,
      },
      token,
      refreshToken,
    };
  }
}

export { AuthenticateUserUseCase };
