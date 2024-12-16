import express, { NextFunction, Request, Response } from 'express';
import plantService from '../service/PlantService';
import { PlantInput, UserInput } from '../types/index';
import { Plant } from '../model/plant';
import UserService from '../service/UserService';

export const plantRouter = express.Router();

plantRouter.get('/all', async (req, res) => {
    try {
        const plants = await plantService.getAllPlants();
        res.status(200).json(plants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching plants' });
    }
});

plantRouter.get('/user/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const plants = await plantService.getUserPlants(username);
        res.status(200).json(plants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching plants' });
    }
});

plantRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, family, wateringFreq, sunlight, email, sms, username } = req.body;
    try {
        const user = await UserService.getUserByUsername(username);
        const newPlant = await plantService.addPlant(name, type, family, wateringFreq, sunlight, email, sms, user);
        res.status(200).json(newPlant);
    } catch (error) {
        next(error);
    }
});

export default plantRouter;