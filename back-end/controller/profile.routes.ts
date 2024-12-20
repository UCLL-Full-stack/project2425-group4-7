import express, { NextFunction, Request, Response } from 'express';
import profileService from '../service/ProfileService';

export const profileRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         userId:
 *           type: integer
 *           format: int64
 * /profiles/{userId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the profile of a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User's ID
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Profile of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Profile not found
 */
profileRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
        const profile = await profileService.getProfileByUserId(Number(userId));
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        next(error);
    }
});