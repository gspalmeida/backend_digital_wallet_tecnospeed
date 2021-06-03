/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import FinancialMovement from '../models/FinancialMovement';
import ServiceType from '../models/FinancialMovementCategory';
import AppError from '../errors/AppError';

interface Request {
  userId: string;
  category: string;
  description: string;
  value: string;
  date: string;
  isMoneyIn: boolean;
}
class CreateProviderService {
  public async execute({
    userId,
    category,
    description,
    value,
    date,
    isMoneyIn,
  }: Request): Promise<FinancialMovement> {
    const financialMovementRepository = getRepository(FinancialMovement);
    const financialMovementCategoryRepository = getRepository(ServiceType);

    const checkMovementCategoryExists = await financialMovementCategoryRepository.findOne(
      {
        where: { movement_category_name: category },
      },
    );

    if (!checkMovementCategoryExists) {
      // TODO Criar lógica para cadastrar novas categorias diretamente pela movimentação financeira
      throw new AppError('Criar nova categoria');
    }

    const service = financialMovementRepository.create({
      user_id: userId,
      movement_category: category,
      description,
      value,
      movement_date: date,
      isMoneyIn,
    });

    await financialMovementRepository.save(service);

    return service;
  }
}
export default CreateProviderService;