/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import FinancialMovementCategory from '../models/FinancialMovementCategory';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  categoryName: string;
}
class UpdateFinancialMovementCategoryService {
  public async execute({
    id,
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
      throw new AppError('Category Already Exists');
    }

    const financialMovementCategory = await financialMovementCategoryRepository.findOne(
      { where: { id } },
    );

    if (!financialMovementCategory) {
      throw new AppError('FinancialMovementCategory ID not found', 500);
    }

    await financialMovementCategoryRepository.update(
      { id },
      {
        movement_category_name: categoryName,
      },
    );

    return financialMovementCategory;
  }
}
export default UpdateFinancialMovementCategoryService;
