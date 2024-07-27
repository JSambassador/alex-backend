import express from 'express';
import { getProfile, updateProfile, register } from '../controllers/user';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();


/**
 * @swagger
 * /user/register:
 *   get:
 *     summary: Register user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 */
router.post('/register', register);

/**
 * @swagger
 * /user/profile:
 *   post:
 *     summary: Get user profile
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 */
router.get('/profile', getProfile);

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: New Name
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.put('/profile', [
  body('name').optional().isString(),
], validateRequest, updateProfile);

export default router;
