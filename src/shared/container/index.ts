import { container } from "tsyringe";

import "./providers";

import { UsersRepository } from "../../modules/Accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../modules/Accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "../../modules/Accounts/repositories/Users/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/Accounts/repositories/Users/IUsersTokensRepository";
import { CarsImagesRepository } from "../../modules/Cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "../../modules/Cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "../../modules/Cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/Cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsRepository } from "../../modules/Cars/repositories/Cars/ICarsRepository";
import { ICarsImagesRepository } from "../../modules/Cars/repositories/CarsImages/ICarsImagesRepository";
import { ICategoriesRepository } from "../../modules/Cars/repositories/Categories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/Cars/repositories/Specifications/ISpecificationsRepository";
import { RentalsRepository } from "../../modules/Rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "../../modules/Rentals/repositories/IRentalsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
