import { UserTokens } from "../../infra/typeorm/entities/UserTokens";

interface ICreateUserTokenDTO {
  userId: string;
  expiresDate: Date;
  refreshToken: string;
}

interface IUsersTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
}

export { ICreateUserTokenDTO, IUsersTokensRepository };
