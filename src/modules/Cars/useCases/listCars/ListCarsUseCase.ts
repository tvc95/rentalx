import { inject, injectable } from "tsyringe";

import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/Cars/ICarsRepository";

interface IRequest {
  categoryId?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ brand, categoryId, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.listAvailable(
      brand,
      categoryId,
      name
    );

    return cars;
  }
}

export { ListCarsUseCase };
