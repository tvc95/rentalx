import { getRepository, Repository } from "typeorm";

import { ICarsImagesRepository } from "../../../repositories/CarsImages/ICarsImagesRepository";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(carId: string, imageName: string): Promise<CarImage> {
    const carImage = this.repository.create({
      carId,
      imageName,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
