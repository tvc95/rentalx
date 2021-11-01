import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/Accounts/repositories/Users/IUsersRepository";
import { UsersRepository } from "../../modules/Accounts/repositories/Users/UsersRepository";
import { CategoriesRepository } from "../../modules/Cars/repositories/Categories/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/Cars/repositories/Categories/ICategoriesRepository";
import { ISpecificationsRepository } from "../../modules/Cars/repositories/Specifications/ISpecificationsRepository";
import { SpecificationsRepository } from "../../modules/Cars/repositories/Specifications/SpecificationsRepository";

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
