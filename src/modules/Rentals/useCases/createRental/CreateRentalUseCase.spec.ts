import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../Cars/repositories/Cars/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      dailyRate: 100,
      licensePlate: "test",
      fineAmount: 40,
      categoryId: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      userId: "12345",
      carId: "45874",
      expectedReturnDate: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("startDate");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: "12345",
        carId: "45874",
        expectedReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: "12345",
        carId: "56988",
        expectedReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: "12345",
        carId: "45874",
        expectedReturnDate: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        userId: "487955",
        carId: "45874",
        expectedReturnDate: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return date/time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        userId: "12345",
        carId: "45874",
        expectedReturnDate: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
