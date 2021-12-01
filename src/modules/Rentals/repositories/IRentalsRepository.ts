import { Rental } from "../infra/typeorm/entities/Rental";

interface ICreateRentalDTO {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
  id?: string;
  endDate?: Date;
  total?: number;
}

interface IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental>;
  findOpenRentalByUser(userId: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(userId: string): Promise<Rental[]>;
}

export { IRentalsRepository, ICreateRentalDTO };
