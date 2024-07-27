import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { signIn, signOut, refreshJWT } from '../services/auth';

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const token = await signIn(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    await signOut(req.body.token);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  try {
    const newToken = await refreshJWT(refreshToken);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};
