import { container } from "tsyringe";

import { UsersRepository } from "../../modules/Accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/Accounts/repositories/Users/IUsersRepository";
import { CarsRepository } from "../../modules/Cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "../../modules/Cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/Cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsRepository } from "../../modules/Cars/repositories/Cars/ICarsRepository";
import { ICategoriesRepository } from "../../modules/Cars/repositories/Categories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/Cars/repositories/Specifications/ISpecificationsRepository";

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
