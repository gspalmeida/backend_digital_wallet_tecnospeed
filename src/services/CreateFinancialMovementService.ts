/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import FinancialMovement from '../models/FinancialMovement';
import FinancialMovementCategory from '../models/FinancialMovementCategory';
import AppError from '../errors/AppError';

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

    console.log('antes de checar');
    const checkMovementCategoryExists = await financialMovementCategoryRepository.findOne(
      {
        where: { movement_category_name: category },
      },
    );
    console.log(checkMovementCategoryExists);

    if (!checkMovementCategoryExists) {
      // TODO Criar lógica para cadastrar novas categorias diretamente pela movimentação financeira
      throw new AppError('Criar nova categoria');
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
