import NavigationBar from "@/components/utils/header";
import Head from "next/head";
import styles from "@/styles/myplants.module.css";
import React, { useEffect, useState } from "react";
import AddPlant from "@/components/plants/AddPlant";
import { Plant } from "@/types/types";
import PlantService from "@/services/PlantService";
import { useNotifications } from "@/components/utils/notifications";

const MyPlants = () => {
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const toggleAddPlant = () => {
    setIsAddingPlant((prev) => !prev);
  };
  const [plants, setPlants] = useState<Plant[]>([]);
  const { sendNotification } = useNotifications();
  const [isClient, setIsClient] = useState(false);

  const fetchPlants = async () => {
    const token = localStorage.getItem("loggedInUser");

    if (!token) {
      sendNotification("Not authorized to fetch plants", "error");
      return;
    }

    try {
      const response = await PlantService.getUserPlants(token);
      if (response.ok) {
        const plants = await response.json();
        setPlants(plants);
      } else {
        sendNotification("Failed to fetch plants: Unauthorized", "error");
      }
    } catch (error) {
      sendNotification("Failed to fetch plants", "error");
    }
  };

  useEffect(() => {
    setIsClient(true);
    fetchPlants();
  }, []);

  const handleAddPlantSubmit = (plantData: any) => {
    setIsAddingPlant(false);
  };

  return (
    <>
      <div className={`${styles.container}`}>
        <Head>
          <title>Rootz | My Plants</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="min-h-screen flex justify-center mt-5">
          {isClient ? (
            plants.length > 0 ? (
              <ul>
                {plants.map((plant) => (
                  <li key={plant.id}>
                    <h3>{plant.name}</h3>
                    <p>Type: {plant.type}</p>
                    <p>Family: {plant.family}</p>
                    <p>Watering Frequency: {plant.wateringFreq}</p>
                    <p>Sunlight: {plant.sunlight}</p>
                    <p>Reminder SMS: {plant.sms ? "Enabled" : "Disabled"}</p>
                    <p>
                      Reminder Email: {plant.email ? "Enabled" : "Disabled"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No plants found</p>
            )
          ) : (
            <p>Loading</p>
          )}
        </main>
      </div>
    </>
  );
};

export default MyPlants;
