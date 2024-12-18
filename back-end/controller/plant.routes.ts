import express, { NextFunction, Request, Response } from 'express';
import plantService from '../service/PlantService';
import { PlantInput, UserInput } from '../types/index';
import { Plant } from '../model/Plant';
import UserService from '../service/UserService';

export const plantRouter = express.Router();

plantRouter.get('/all', async (req, res) => {
    try {
        const plants = await plantService.getAllPlants();
        res.status(200).json(plants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching plants (router)' });
    }
});

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

plantRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    const { name, type, family, wateringFreq, sunlight, user, email, sms } = req.body;
    console.log(req.body);
    try {
        const created = new Date();
        const newPlant = await plantService.addPlant(name, type, family, wateringFreq, sunlight, email, sms, user, created);
        res.status(200).json(newPlant);
    } catch (error) {
        next(error);
    }
});

export default plantRouter;