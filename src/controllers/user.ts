import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { getUserProfile, updateUserProfile } from '../services/user';
import { registerUser } from '../services/user';
import { User } from '@prisma/client';

// Extend the Express Request type with the user property
interface CustomRequest extends Express.Request {
  user?: any;
  body?: any;
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
 
  try {
    const { email, password, name } = req.body;
    console.log("Register", email, password, name);
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const newUser = await registerUser({ email, password, name });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: CustomRequest, res: Response) => {
  try {
    const profile = await getUserProfile(req.user.id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateProfile = async (req: CustomRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const profile = await updateUserProfile(req.user.id, req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
