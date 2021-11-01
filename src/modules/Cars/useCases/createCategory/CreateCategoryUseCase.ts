import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/Categories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
/**
 * Aplicação do Single Responsibility Principle (SOLID)
 */
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
