import { CarsRepositoryInMemory } from "../../repositories/Cars/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: "FIAT",
      categoryId: "6fe7cd29-694e-4b12-8a92-fcea83387165",
      dailyRate: 120.0,
      description: "Novo SUV da FIAT com base no Argo",
      fineAmount: 50.0,
      licensePlate: "QWE-4286",
      name: "Pulse",
    });

    const car2 = await carsRepositoryInMemory.create({
      brand: "FIAT",
      categoryId: "a6714326-ded3-4d47-9421-170b4974b1e6",
      dailyRate: 80.0,
      description: "Carro flagship da FIAT",
      fineAmount: 32.0,
      licensePlate: "QSA-1258",
      name: "Argo",
    });

    const cars = await listCarsUseCase.execute({});
    // console.log(cars);

    expect(cars).toEqual([car1, car2]);
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: "FIAT",
      categoryId: "6fe7cd29-694e-4b12-8a92-fcea83387165",
      dailyRate: 120.0,
      description: "Novo SUV da FIAT com base no Argo",
      fineAmount: 50.0,
      licensePlate: "QWE-4286",
      name: "Pulse",
    });

    const car2 = await carsRepositoryInMemory.create({
      brand: "FIAT",
      categoryId: "a6714326-ded3-4d47-9421-170b4974b1e6",
      dailyRate: 80.0,
      description: "Carro flagship da FIAT",
      fineAmount: 32.0,
      licensePlate: "QSA-1258",
      name: "Argo",
    });

    const cars = await listCarsUseCase.execute({
      name: "Pulse",
    });
    // console.log(cars);

    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by category Id", async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: "FIAT",
      categoryId: "6fe7cd29-694e-4b12-8a92-fcea83387165",
      dailyRate: 120.0,
      description: "Novo SUV da FIAT com base no Argo",
      fineAmount: 50.0,
      licensePlate: "QWE-4286",
      name: "Pulse",
    });

    const car2 = await carsRepositoryInMemory.create({
      brand: "FIAT",
      categoryId: "a6714326-ded3-4d47-9421-170b4974b1e6",
      dailyRate: 80.0,
      description: "Carro flagship da FIAT",
      fineAmount: 32.0,
      licensePlate: "QSA-1258",
      name: "Argo",
    });

    const cars = await listCarsUseCase.execute({
      categoryId: "a6714326-ded3-4d47-9421-170b4974b1e6",
    });
    // console.log(cars);

    expect(cars).toEqual([car2]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: "FIAT",
      categoryId: "6fe7cd29-694e-4b12-8a92-fcea83387165",
      dailyRate: 120.0,
      description: "Novo SUV da FIAT com base no Argo",
      fineAmount: 50.0,
      licensePlate: "QWE-4286",
      name: "Pulse",
    });

    const car2 = await carsRepositoryInMemory.create({
      brand: "FIAT",
      categoryId: "a6714326-ded3-4d47-9421-170b4974b1e6",
      dailyRate: 80.0,
      description: "Carro flagship da FIAT",
      fineAmount: 32.0,
      licensePlate: "QSA-1258",
      name: "Argo",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Audi",
    });
    // console.log(cars);

    expect(cars).toEqual([]);
  });
});
