import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { create, findAll, findById, update, remove } from '../services/portfolio';

export const createPortfolio = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const portfolio = await create(req.body);
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPortfolios = async (req: Request, res: Response) => {
  try {
    const portfolios = await findAll();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getPortfolioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const portfolio = await findById(Number(id));
    if (portfolio) {
      res.status(200).json(portfolio);
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updatePortfolio = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  try {
    const portfolio = await update(Number(id), req.body);
    if (portfolio) {
      res.status(200).json(portfolio);
    } else {
      res.status(404).json({ error: 'Portfolio not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deletePortfolio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await remove(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
