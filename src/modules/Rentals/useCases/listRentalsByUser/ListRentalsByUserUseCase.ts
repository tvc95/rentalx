import { inject, injectable } from "tsyringe";

import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
  userId: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ userId }: IRequest): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(userId);

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
