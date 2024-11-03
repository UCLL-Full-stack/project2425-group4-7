import NavigationBar from "@/components/utils/NavigationBar";
import Head from "next/head";
import styles from "@/styles/myplants.module.css";
import React, { useState } from "react";
import PlantsList from "@/components/plants/PlantsList";
import AddPlant from "@/components/plants/AddPlant";

const MyPlants = () => {
  const [isAddingPlant, setIsAddingPlant] = useState(false);

  const toggleAddPlant = () => {
    setIsAddingPlant((prev) => !prev);
  };

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
        <NavigationBar />
        <main className={`${styles.main}`}>
          <PlantsList onToggleAddPlant={toggleAddPlant} />
          {isAddingPlant && <AddPlant />}
        </main>
      </div>
    </>
  );
};

export default MyPlants;
