/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Plant:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Plant's ID
 *           format: int64
 *         name:
 *           type: string
 *           description: Plant's Name
 *         type:
 *           type: string
 *           description: Plant's Type
 *         family:
 *           type: string
 *           description: Plant's Family
 *         wateringFreq:
 *           type: string
 *           description: The frequency of watering
 *         sunlight:
 *           type: string
 *           description: The plant's required sunlight
 *         user:
 *           type: object
 *           description: The plant's user
 *         email:
 *           type: boolean
 *           description: Toggle Email reminder
 *         sms:
 *           type: boolean
 *           description: Toggle SMS reminder
 *         created:
 *           type: Date
 *           description: Date and time of creation
 */
import express, { NextFunction, Request, Response } from 'express';
import plantService from '../service/PlantService';
import { PlantInput, UserInput } from '../types/index';
import { Plant } from '../model/Plant';
import UserService from '../service/UserService';

export const plantRouter = express.Router();

/**
 * @swagger
 * /plants/all:
 *   get:
 *     summary: Get all plants
 *     responses:
 *       200:
 *         description: All the plants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plant'
 */
plantRouter.get('/all', async (req, res) => {
    try {
        const plants = await plantService.getAllPlants();
        res.status(200).json(plants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching plants (router)' });
    }
});

/**
 * @swagger
 * /plants/user/{username}:
 *   get:
 *     summary: Get the plants of a user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: All plants of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plant'
 */
plantRouter.get('/user/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const plants = await plantService.getUserPlants(username);
        res.status(200).json(plants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

/**
 * @swagger
 * /plants/add:
 *   post:
 *     summary: Add a new plant to a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plant'
 *     responses:
 *       200:
 *         description: Successfully created plant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 */
plantRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, family, wateringFreq, sunlight, user, email, sms } = req.body;
    //console.log(req.body);
    try {
        const created = new Date();
        const plantInput: PlantInput = {
            name: name ?? 'Unknown Plant',
            type: type,
            family: family,
            wateringFreq: wateringFreq ?? 'never',
            sunlight: sunlight ?? 'low',
            email: email,
            sms: sms,
            user: user,
            created: created
        };
        const newPlant = await plantService.addPlant(plantInput);
        res.status(200).json(newPlant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

/**
 * @swagger
 * /plants/edit/{id}:
 *   put:
 *     summary: Edit a user's plant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the plant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plant'
 *     responses:
 *       200:
 *         description: Edited plant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plant'
 *       404:
 *         description: Plant not found
 */
plantRouter.put('/edit/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const plantInput: PlantInput = req.body;
    console.log('Received Plant Input:', plantInput);
    console.log('Plant ID from params:', id);
    if (!plantInput.user || !plantInput.user.id) {
        return res.status(400).json({ message: 'Invalid user data provided' });
    }

    try {
        const editedPlant = await plantService.editPlant(Number(id), plantInput);
        if (!editedPlant) {
            return res.status(404).json({ message: `Plant: ${id} not found` });
        }
        res.status(200).json(editedPlant);
    } catch (error) {
        console.error('Error editing plant:', error);
        res.status(500).json();
    }
});

/**
 * @swagger
 * /plants/delete/{id}:
 *   delete:
 *     summary: Delete plant by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Plant's ID
 *     responses:
 *       200:
 *         description: Successfully deleted plant
 *       404:
 *         description: Plant not found
 */
plantRouter.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    const numId = Number(id);
    try {
        const deletePlant = await plantService.deletePlantById(numId);
        res.status(200).json({ message: "Deleted plant"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

export default plantRouter;