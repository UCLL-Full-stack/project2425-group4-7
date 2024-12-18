import NavigationBar from "@/components/utils/header";
import Head from "next/head";
import styles from "@/styles/myplants.module.css";
import React, { useEffect, useState } from "react";
import AddPlant from "@/components/plants/AddPlant";
import { Plant } from "@/types/types";
import PlantService from "@/services/PlantService";
import { useNotifications } from "@/components/utils/notifications";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const MyPlants = () => {
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const toggleAddPlant = () => {
    setIsAddingPlant((prev) => !prev);
  };
  const [plants, setPlants] = useState<Plant[]>([]);
  const { sendNotification } = useNotifications();
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();

  const fetchPlants = async () => {
    const token = localStorage.getItem("loggedInUser");

    if (!token) {
      sendNotification(`${t("myPlants.notification_authorized")}`, "error");
      return;
    }

    try {
      const response = await PlantService.getUserPlants(token);
      if (response.ok) {
        const plants = await response.json();
        setPlants(plants);
      } else {
        sendNotification(
          `${t("myPlants.notification_failed_to_fetch_unauthorized")}`,
          "error"
        );
      }
    } catch (error) {
      sendNotification(
        `${t("myPlants.notification_failed_to_fetch")}`,
        "error"
      );
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
          <title>{t("myPlants.title")}</title>
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
                    <p>
                      {t("myPlants.type")} {plant.type}
                    </p>
                    <p>
                      {t("myPlants.family")} {plant.family}
                    </p>
                    <p>
                      {t("myPlants.watering_frequency")} {plant.wateringFreq}
                    </p>
                    <p>
                      {t("myPlants.sunlight")} {plant.sunlight}
                    </p>
                    <p>
                      {t("myPlants.sms_reminder")}{" "}
                      {plant.sms ? "Enabled" : "Disabled"}
                    </p>
                    <p>
                      {t("myPlants.email_reminder")}{" "}
                      {plant.email ? "Enabled" : "Disabled"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t("myPlants.no_plants_found")}</p>
            )
          ) : (
            <p>{t("myPlants.loading")}</p>
          )}
        </main>
      </div>
    </>
  );
};

export default MyPlants;

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
