import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/Cars/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/Specifications/ISpecificationsRepository";

interface IRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new AppError("Car doesn't exist!", 404);
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationsId
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
