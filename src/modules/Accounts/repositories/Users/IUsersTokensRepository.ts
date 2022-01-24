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
}

export { ICreateUserTokenDTO, IUsersTokensRepository };
