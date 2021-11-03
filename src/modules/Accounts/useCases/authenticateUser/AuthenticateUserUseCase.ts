import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/Users/IUsersRepository";

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
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verificar se o usuário existe
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new Error("E-mail or password incorrect!");
    }

    // Decriptar a senha para identificar se o usuário colocou a senha corretamente
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("E-mail or password incorrect!");
    }

    // Gerar um token de autenticação, caso a senha esteja correta
    const token = sign({}, "38558aa5db5cf08625bee50665c73760", {
      subject: userAlreadyExists.id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: userAlreadyExists.name,
        admin: userAlreadyExists.admin,
        email: userAlreadyExists.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
