import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/Users/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/Users/IUsersTokensRepository";

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exist!");
    }

    const token = uuidv4();

    const expiresDate = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refreshToken: token,
      userId: user.id,
      expiresDate,
    });
  }
}

export { SendForgotPasswordMailUseCase };
