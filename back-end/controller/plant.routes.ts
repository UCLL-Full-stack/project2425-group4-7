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

plantRouter.put('/edit/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const plantInput = <PlantInput>req.body;
    console.log(plantInput);
    console.log(id);
    try {
        const editedPlant = await plantService.editPlant(Number(id), plantInput);
        if (!editedPlant) {
            return res.status(404).json({ message: `Plant: ${id} not found` });
        }
        res.status(200).json(editedPlant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

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