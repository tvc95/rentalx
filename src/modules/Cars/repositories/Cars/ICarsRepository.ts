import { Car } from "../../infra/typeorm/entities/Car";
import { Category } from "../../infra/typeorm/entities/Category";
import { Specification } from "../../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  specifications?: Specification[];
  id?: string;
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  listAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]>;
}

export { ICreateCarDTO, ICarsRepository };
