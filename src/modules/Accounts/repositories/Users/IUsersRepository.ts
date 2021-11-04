import { User } from "../../entities/User";

interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
  id?: string;
  avatar?: string;
}

interface IUsersRepository {
  create({
    name,
    email,
    password,
    driverLicense,
  }: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO };
