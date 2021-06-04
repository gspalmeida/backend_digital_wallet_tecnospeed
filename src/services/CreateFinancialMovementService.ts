/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import FinancialMovement from '../models/FinancialMovement';
import FinancialMovementCategory from '../models/FinancialMovementCategory';
import CreateFinancialMovementCategoryService from './CreateFinancialMovementCategoryService';

interface Request {
  userId: string;
  category: string;
  description: string;
  value: string;
  date: string;
  isMoneyIn: boolean;
}
class CreateFinancialMovementService {
  public async execute({
    userId,
    category,
    description,
    value,
    date,
    isMoneyIn,
  }: Request): Promise<FinancialMovement> {
    const financialMovementRepository = getRepository(FinancialMovement);
    const financialMovementCategoryRepository = getRepository(
      FinancialMovementCategory,
    );

    let checkMovementCategoryExists = await financialMovementCategoryRepository.findOne(
      {
        where: { movement_category_name: category },
      },
    );

    if (!checkMovementCategoryExists) {
      const createFinancialMovementCategory = new CreateFinancialMovementCategoryService();

      const movementCategory = await createFinancialMovementCategory.execute({
        categoryName: category,
      });
      checkMovementCategoryExists = movementCategory;
    }

    const financialMovement = financialMovementRepository.create({
      user_id: userId,
      movement_category: checkMovementCategoryExists.id,
      description,
      value,
      movement_date: date,
      isMoneyIn,
    });

    await financialMovementRepository.save(financialMovement);

    return financialMovement;
  }
}
export default CreateFinancialMovementService;
