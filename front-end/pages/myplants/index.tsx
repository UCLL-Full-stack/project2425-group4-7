import NavigationBar from "@/components/utils/header";
import Head from "next/head";
import styles from "@/styles/myplants.module.css";
import React, { useEffect, useState } from "react";
import AddPlant from "@/components/plants/AddPlant";
import { Plant } from "@/types/types";
import PlantService from "@/services/PlantService";
import { useNotifications } from "@/components/utils/notifications";
import PlantCard from "@/components/plants/PlantCard";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const MyPlants = () => {
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const { sendNotification } = useNotifications();
  const [isClient, setIsClient] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { t } = useTranslation();

  const fetchPlants = async () => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      sendNotification("Not authorized to fetch plants", "error");
      return;
    }

    try {
      const parsedUser = JSON.parse(loggedInUser);
      const username = parsedUser.username;
      const plants = await PlantService.getUserPlants(username);
      setPlants(plants);
    } catch (error) {
      console.error(error);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const filteredPlants = plants.filter((plant) => {
    const lowerCaseQuery = searchInput.toLowerCase();
    return (
      plant.name.toLowerCase().includes(lowerCaseQuery) ||
      plant.type.toLowerCase().includes(lowerCaseQuery) ||
      plant.family.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const toggleAddPlant = () => {
    setIsAddingPlant((prev) => !prev);
  };

  return (
    <>
      <div className={`${styles.container}`}>
        <Head>
          <title>{t("myPlants.title")}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="min-h-screen flex flex-col items-center mt-5 text-white">
          <h1 className="font-bold text-lg">My Plants</h1>
          <hr className="mb-3 mt-2 bg-white w-[26.8rem]" />
          <div className="flex flex-row gap-4 mb-3">
            <div className="px-6 pb-2 font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 focus-within:after:w-full after:transition-all after:duration-300">
              <FaMagnifyingGlass className="mt-1 mr-2" />
              <input
                className="bg-transparent placeholder:text-white outline-none"
                type="text"
                placeholder="Search a plant"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
            <button
              onClick={toggleAddPlant}
              className="px-6 pb-2 font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
            >
              <FaPlus className="mt-1 mr-1" />
              New Plant
            </button>
          </div>

          {isClient ? (
            filteredPlants.length > 0 ? (
              <ul
                className={`w-fit items-center ${
                  filteredPlants.length === 1
                    ? "flex-col"
                    : "grid grid-cols-2 gap-6"
                }`}
              >
                {filteredPlants.map((plant) => (
                  <li key={plant.id}>
                    <PlantCard
                      plant={{
                        id: plant.id,
                        name: plant.name,
                        type: plant.type,
                        family: plant.family,
                        wateringFreq: plant.wateringFreq,
                        sunlight: plant.sunlight,
                        user: plant.user,
                        email: plant.email,
                        sms: plant.sms,
                        created: plant.created,
                      }}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t("myPlants.no_plants_found")}</p>
            )
          ) : (
            <p>{t("myPlants.loading")}</p>
          )}
          {isAddingPlant && (
            <AddPlant onAddPlant={toggleAddPlant} onClose={toggleAddPlant} />
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
