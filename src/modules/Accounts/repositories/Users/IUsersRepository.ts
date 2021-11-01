import { User } from "../../entities/User";

interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
}

interface IUsersRepository {
  create({
    name,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO };
