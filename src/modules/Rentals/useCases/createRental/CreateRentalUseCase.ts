import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

dayjs.extend(utc);

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({
    carId,
    expectedReturnDate,
    userId,
  }: IRequest): Promise<Rental> {
    const minimumHours = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable!");
    }

    const rentalOpenedToUser =
      await this.rentalsRepository.findOpenRentalByUser(userId);

    if (rentalOpenedToUser) {
      throw new AppError("There is a rental in progress for the user!");
    }

    const expectedReturnDateFormat = dayjs(expectedReturnDate)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const compareDate = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

    if (compareDate < minimumHours) {
      throw new AppError(
        "Expected return date should be of at least 24 hours (1 full day)"
      );
    }
    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
