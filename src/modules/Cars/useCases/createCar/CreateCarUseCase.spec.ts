import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/Cars/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Name",
      description: "Car description",
      dailyRate: 150,
      licensePlate: "WES-4523",
      fineAmount: 10,
      brand: "Car Brand",
      categoryId: "789sad5-asd48-1548as-12548asd5",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with an already registered license plate", async () => {
    await createCarUseCase.execute({
      name: "Car Nice 01",
      description: "Car description 01",
      dailyRate: 150,
      licensePlate: "WES-4523",
      fineAmount: 10,
      brand: "Car Brand",
      categoryId: "789sad5-asd48-1548as-12548asd5",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car Nice 02",
        description: "Car description 02",
        dailyRate: 158,
        licensePlate: "WES-4523",
        fineAmount: 10,
        brand: "Car Brand",
        categoryId: "789sad5-asd48-1548as-12548asd5",
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "This car is available men",
      dailyRate: 254,
      licensePlate: "SDW-4523",
      fineAmount: 10,
      brand: "Car Brand",
      categoryId: "789sad5-asd48-1548as-12548asd5",
    });

    expect(car.available).toBe(true);
  });
});
