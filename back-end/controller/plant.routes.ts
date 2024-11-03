import { Router } from 'express';
import { PlantService } from '../service/PlantService';
import { Plant } from '../model/Plant';

const router = Router();
const plantService = new PlantService();

router.post('/', async (req, res) => {
    const { plantId, plantType, family, wateringFreq, sunlight, reminders } = req.body;
    const newPlant = new Plant(plantId, plantType, family, wateringFreq, sunlight, reminders);

    try {
        const addedPlant = await plantService.addPlant(newPlant);
        res.status(201).json(addedPlant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding plant' });
    }
});

router.get('/', async (req, res) => {
    try {
        const plants = await plantService.getAllPlants();
        res.status(200).json(plants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching plants' });
    }
});

router.get('/:plantId', async (req, res) => {
    const plantId = Number(req.params.plantId);
    try {
        const plant = await plantService.getPlant(plantId);
        if (plant) {
            res.status(200).json(plant);
        } else {
            res.status(404).json({ message: 'Plant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching plant' });
    }
});

router.put('/:plantId', async (req, res) => {
    const plantId = Number(req.params.plantId);
    try {
        const updatedPlant = await plantService.updatePlant(plantId, req.body);
        if (updatedPlant) {
            res.status(200).json(updatedPlant);
        } else {
            res.status(404).json({ message: 'Plant not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating plant' });
    }
});

router.delete('/:plantId', async (req, res) => {
    const plantId = Number(req.params.plantId);
    try {
        await plantService.deletePlant(plantId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting plant' });
    }
});

export default router;