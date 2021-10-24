import { Router } from "express";

import { Category } from "../modules/Cars/model/Category";
import { CategoriesRepository } from "../modules/Cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/Cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const list = categoriesRepository.list();

  return response.status(200).json(list);
});

export { categoriesRoutes };
