/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import FinancialMovementCategory from '../models/FinancialMovementCategory';
import AppError from '../errors/AppError';

interface Request {
  categoryName: string;
}
class CreateFinancialMovementCategoryService {
  public async execute({
    categoryName,
  }: Request): Promise<FinancialMovementCategory> {
    const financialMovementCategoryRepository = getRepository(
      FinancialMovementCategory,
    );

    const checkFinancialMovementCategoryExists = await financialMovementCategoryRepository.findOne(
      {
        where: { movement_category_name: categoryName },
      },
    );

    if (checkFinancialMovementCategoryExists) {
      throw new AppError('Category already booked');
    }

    const movementCategory = financialMovementCategoryRepository.create({
      movement_category_name: categoryName,
    });

    await financialMovementCategoryRepository.save(movementCategory);

    return movementCategory;
  }
}
export default CreateFinancialMovementCategoryService;
