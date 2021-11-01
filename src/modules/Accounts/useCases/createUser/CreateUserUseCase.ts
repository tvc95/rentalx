import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/Users/IUsersRepository";

interface IRequest {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, password, email, driverLicense }: IRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("This user is already registered");
    }

    await this.usersRepository.create({
      name,
      password,
      email,
      driverLicense,
    });
  }
}

export { CreateUserUseCase };
