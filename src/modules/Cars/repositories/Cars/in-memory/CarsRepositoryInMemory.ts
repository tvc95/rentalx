import { Car } from "../../../infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.cars.find((c) => c.licensePlate === licensePlate);

    return car;
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
    const car = new Car();

    Object.assign(car, {
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async listAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    const availableCars = this.cars.filter((car) => car.available === true);

    if (brand || categoryId || name) {
      const filterAvailableCars = availableCars.filter(
        (car) =>
          (brand && car.brand === brand) ||
          (categoryId && car.categoryId === categoryId) ||
          (name && car.name === name)
      );

      return filterAvailableCars;
    }

    return availableCars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
