import { getRepository, Repository } from "typeorm";

import {
  ICreateRentalDTO,
  IRentalsRepository,
} from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { carId, endDate: null },
    });
    return openByCar;
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { userId, endDate: null },
    });
    return openByUser;
  }

  async create({
    carId,
    expectedReturnDate,
    userId,
    id,
    endDate,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      carId,
      expectedReturnDate,
      userId,
      id,
      endDate,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findByUser(userId: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { userId },
      relations: ["car"],
    });

    return rentals;
  }
}

export { RentalsRepository };
