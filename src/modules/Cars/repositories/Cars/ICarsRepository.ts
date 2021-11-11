import { Car } from "../../infra/typeorm/entities/Car";
import { Category } from "../../infra/typeorm/entities/Category";

interface ICreateCarDTO {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  listAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]>;
}

export { ICreateCarDTO, ICarsRepository };
