/*import styles from "@/styles/myplants.module.css";
import { useEffect, useState } from "react";
import PlantService from "@/services/PlantService";
import { Plant } from "@/types/types";
import PlantCard from "./PlantCard";

type PlantsProps = {
  onToggleAddPlant: () => void;
  onAddPlant: () => void;
};

function PlantsList({ onToggleAddPlant, onAddPlant }: PlantsProps) {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlants = async () => {
    try {
      const plantList = await PlantService.getPlants();
      setPlants(plantList);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleAddPlant = async () => {
    await fetchPlants();
    onAddPlant();
  };

  return (
    <>
      <div className="bg-slate-50">
        <div>
          <h2>My Plants (oude versie)</h2>
          <button onClick={onToggleAddPlant}>Nieuwe Plant</button>
        </div>
        <div>
          {plants.map((plant) => (
            <PlantCard
              plant={{
                name: plant.name,
                type: plant.type,
                family: plant.family,
                wateringFreq: plant.wateringFreq,
                sunlight: plant.sunlight,
                email: plant.email,
                sms: plant.sms,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default PlantsList;*/
