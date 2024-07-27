import express from 'express';
import { body, param } from 'express-validator';
import { createPortfolio, getPortfolios, getPortfolioById, updatePortfolio, deletePortfolio } from '../controllers/portfolio';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: Get all portfolios
 *     tags: [Portfolio]
 *     responses:
 *       200:
 *         description: List of portfolios
 */
router.get('/', getPortfolios);

/**
 * @swagger
 * /portfolio/{id}:
 *   get:
 *     summary: Get portfolio by ID
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Portfolio ID
 *     responses:
 *       200:
 *         description: Portfolio fetched successfully
 *       404:
 *         description: Portfolio not found
 */
router.get('/:id', [param('id').isInt()], validateRequest, getPortfolioById);

/**
 * @swagger
 * /portfolio:
 *   post:
 *     summary: Create a new portfolio
 *     tags: [Portfolio]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardImg:
 *                 type: string
 *               title:
 *                 type: object
 *               cardDescription:
 *                 type: object
 *               labels:
 *                 type: object
 *               logo:
 *                 type: string
 *               previewLink:
 *                 type: string
 *               link:
 *                 type: string
 *               bgImg:
 *                 type: string
 *               description:
 *                 type: object
 *               client:
 *                 type: string
 *               scope:
 *                 type: object
 *               startDate:
 *                 type: string
 *                 format: date
 *               finishDate:
 *                 type: string
 *                 format: date
 *               feedback:
 *                 type: object
 *               content:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: string
 *               userId:
 *                 type: integer
 *             example:
 *               cardImg: "path/to/image.jpg"
 *               title: { "en": { "title": "Project Title" } }
 *               cardDescription: { "en": { "description": "Short description" } }
 *               labels: { "en": ["Label1", "Label2"] }
 *               logo: "path/to/logo.png"
 *               previewLink: "https://example.com/preview"
 *               link: "https://example.com"
 *               bgImg: "path/to/bg.jpg"
 *               description: { "en": { "description": "Detailed description" } }
 *               client: "Client Name"
 *               scope: { "en": { "scope": "Scope details" } }
 *               startDate: "2024-01-01"
 *               finishDate: "2024-12-31"
 *               feedback: { "text": { "en": "Great job!" } }
 *               content: [["path/to/image1.jpg", "path/to/image2.jpg"]]
 *               userId: 1
 *     responses:
 *       201:
 *         description: Portfolio created successfully
 */
router.post('/', [
  body('cardImg').isString(),
  body('title').isObject(),
  body('cardDescription').isObject(),
  body('labels').isObject(),
  body('logo').isString(),
  body('previewLink').isString(),
  body('link').isString(),
  body('bgImg').isString(),
  body('description').isObject(),
  body('client').isString(),
  body('scope').isObject(),
  body('startDate').isDate(),
  body('finishDate').isDate(),
  body('feedback').isObject(),
  body('content').isArray(),
  body('userId').isInt(),
], validateRequest, createPortfolio);

/**
 * @swagger
 * /portfolio/{id}:
 *   put:
 *     summary: Update portfolio by ID
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Portfolio ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardImg:
 *                 type: string
 *               title:
 *                 type: object
 *               cardDescription:
 *                 type: object
 *               labels:
 *                 type: object
 *               logo:
 *                 type: string
 *               previewLink:
 *                 type: string
 *               link:
 *                 type: string
 *               bgImg:
 *                 type: string
 *               description:
 *                 type: object
 *               client:
 *                 type: string
 *               scope:
 *                 type: object
 *               startDate:
 *                 type: string
 *                 format: date
 *               finishDate:
 *                 type: string
 *                 format: date
 *               feedback:
 *                 type: object
 *               content:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: string
 *     responses:
 *       200:
 *         description: Portfolio updated successfully
 *       404:
 *         description: Portfolio not found
 */
router.put('/:id', [
  param('id').isInt(),
  body('cardImg').optional().isString(),
  body('title').optional().isObject(),
  body('cardDescription').optional().isObject(),
  body('labels').optional().isObject(),
  body('logo').optional().isString(),
  body('previewLink').optional().isString(),
  body('link').optional().isString(),
  body('bgImg').optional().isString(),
  body('description').optional().isObject(),
  body('client').optional().isString(),
  body('scope').optional().isObject(),
  body('startDate').optional().isDate(),
  body('finishDate').optional().isDate(),
  body('feedback').optional().isObject(),
  body('content').optional().isArray(),
], validateRequest, updatePortfolio);

/**
 * @swagger
 * /portfolio/{id}:
 *   delete:
 *     summary: Delete portfolio by ID
 *     tags: [Portfolio]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Portfolio ID
 *     responses:
 *       204:
 *         description: Portfolio deleted successfully
 *       404:
 *         description: Portfolio not found
 */
router.delete('/:id', [param('id').isInt()], validateRequest, deletePortfolio);

export default router;
