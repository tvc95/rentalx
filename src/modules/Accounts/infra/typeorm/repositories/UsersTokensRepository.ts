import { getRepository, Repository } from "typeorm";

import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from "../../../repositories/Users/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
