import styles from "@/styles/myplants.module.css";
import { useEffect, useState } from "react";
import PlantService from "@/services/PlantService";
import { Plant } from "@/types/types";

type PlantsProps = {
  onToggleAddPlant: () => void;
  onAddPlant: () => void;
};

function PlantsList({ onToggleAddPlant, onAddPlant }: PlantsProps) {
  const [plants, setPlants] = useState<Plant[]>([]);

  const fetchPlants = async () => {
    try {
      const plantList = await PlantService.getPlants();
      setPlants(plantList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleAddPlant = async () => {
    await fetchPlants();
    onAddPlant();
  };

  return (
    <>
      <section className={`${styles.myPlants}`}>
        <div className={`${styles.topList}`}>
          <h2>My Plants</h2>
          <button onClick={onToggleAddPlant}>Nieuwe Plant</button>
        </div>
        <div className={`${styles.plantlist}`}>
          {plants.map((plant) => (
            <div key={plant._plantId} className={styles.plantitem}>
              <div></div>
              <h4>{plant._plantType || "No Type"}</h4>
              <h5>{plant._family || "No Family"}</h5>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default PlantsList;
