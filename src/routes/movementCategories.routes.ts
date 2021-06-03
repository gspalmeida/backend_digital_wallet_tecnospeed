/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import FinancialMovementCategory from '../models/FinancialMovementCategory';

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

export default movementCategoriesRouter;
