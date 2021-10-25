import { ICategoriesRepository } from "../../repositories/Categories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
/**
 * Aplicação do Single Responsibility Principle (SOLID)
 */
class CreateCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute({ name, description }: IRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
