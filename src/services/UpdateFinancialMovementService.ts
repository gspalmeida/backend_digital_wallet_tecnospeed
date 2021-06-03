/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import FinancialMovement from '../models/FinancialMovement';
import FinancialMovementCategory from '../models/FinancialMovementCategory';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  category: string;
  description: string;
  value: string;
  date: string;
  isMoneyIn: boolean;
}
class UpdateProvidedServiceService {
  public async execute({
    id,
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

    const checkMovementCategoryExists = await financialMovementCategoryRepository.findOne(
      {
        where: { movement_category_name: category },
      },
    );

    if (!checkMovementCategoryExists) {
      // TODO Criar lógica para cadastrar novas categorias diretamente pela movimentação financeira
      throw new AppError('Criar nova categoria');
    }

    await financialMovementRepository.update(
      { id },
      {
        movement_category: category,
        description,
        value,
        movement_date: date,
        isMoneyIn,
      },
    );

    const service = await financialMovementRepository.findOne({
      where: { id },
    });

    if (!service) {
      throw new AppError('FinancialMovement id not found', 401);
    }
    return service;
  }
}
export default UpdateProvidedServiceService;
