import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/Cars/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/Specifications/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Volkswagen",
      categoryId: "a6714326-ded3-4d47-9421-170b4974b1e6",
      dailyRate: 70,
      description: "Carro flagship da VW",
      fineAmount: 25,
      licensePlate: "PLT-8956",
      name: "Polo",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "Câmbio automático",
      name: "Automático",
    });

    const specificationsId = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationsId,
    });

    console.log(specificationsCars);

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it("should NOT be able to add a new specification to a non-existing car", async () => {
    expect(async () => {
      const carId = "1234";
      const specificationsId = ["54698"];

      await createCarSpecificationUseCase.execute({ carId, specificationsId });
    }).rejects.toBeInstanceOf(AppError);
  });
});
