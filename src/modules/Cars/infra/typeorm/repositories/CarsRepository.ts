import { getRepository, Repository } from "typeorm";

import {
  ICarsRepository,
  ICreateCarDTO,
} from "../../../repositories/Cars/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      licensePlate,
    });

    return car;
  }

  async listAvailable(): Promise<Car[]> {
    const cars = await this.repository.find();

    return cars;
  }
}

export { CarsRepository };
