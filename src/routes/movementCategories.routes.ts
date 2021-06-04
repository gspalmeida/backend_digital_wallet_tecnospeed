/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import FinancialMovementCategory from '../models/FinancialMovementCategory';
import CreateFinancialMovementCategoryService from '../services/CreateFinancialMovementCategoryService';

const movementCategoriesRouter = Router();

movementCategoriesRouter.get(
  '/',
  ensureAuthenticated,
  async (request, response) => {
    const financialMovementCategoryRepository = getRepository(
      FinancialMovementCategory,
    );

    const movementCategory = await financialMovementCategoryRepository.find();
    return response.json(movementCategory);
  },
);

movementCategoriesRouter.post(
  '/',
  ensureAuthenticated,
  async (request, response) => {
    const { categoryName } = request.body;
    const createFinancialMovementCategory = new CreateFinancialMovementCategoryService();

    const financialMovementCategory = await createFinancialMovementCategory.execute(
      {
        categoryName,
      },
    );

    return response.json(financialMovementCategory);
  },
);

export default movementCategoriesRouter;
