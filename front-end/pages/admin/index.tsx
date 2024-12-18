import Head from "next/head";
import styles from "@/styles/settings.module.css";
import React, { useEffect, useState } from "react";
import { useNotifications } from "@/components/utils/notifications";
import { Plant } from "@/types/types";
import { getUserRole } from "@/components/auth/auth";
import PlantService from "@/services/PlantService";
import PlantCard from "@/components/plants/PlantCard";
import AdminPlantCard from "@/components/plants/AdminPlantCard";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const { sendNotification } = useNotifications();
  const [isClient, setIsClient] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const { t } = useTranslation();

  const fetchPlants = async () => {
    try {
      const plants = await PlantService.getAllPlants();
      setPlants(plants);
    } catch (error) {}
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const filteredPlants = plants.filter((plant) => {
    const lowerCaseQuery = searchInput.toLowerCase();
    return (
      plant.name.toLowerCase().includes(lowerCaseQuery) ||
      plant.type.toLowerCase().includes(lowerCaseQuery) ||
      plant.family.toLowerCase().includes(lowerCaseQuery) ||
      plant.user.username.toLowerCase().includes(lowerCaseQuery)
    );
  });

  useEffect(() => {
    setIsClient(true);
    fetchPlants();
  }, []);
  return (
    <>
      <Head>
        <title>{t("admin.title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col items-center mt-5 text-white">
        <h1 className="font-bold text-lg">Admin Dashboard</h1>
        <div className="flex flex-row gap-5 mt-1">
          <button className="font-semibold text-md p-1">Plants</button>
          <button className="font-semibold text-md p-1">Users</button>
        </div>
        <section>
          <hr className="mb-3 mt-2 bg-white w-full" />
          <div className="gap-4 mb-3">
            <div className="px-6 w-fit pb-1 font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 focus-within:after:w-full after:transition-all after:duration-300">
              <FaMagnifyingGlass className="mt-1 mr-2" />
              <input
                className="bg-transparent placeholder:text-white outline-none"
                type="text"
                placeholder="Search a plant"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {isClient ? (
            filteredPlants.length > 0 ? (
              <ul className="w-fit flex flex-col items-center gap-4">
                {filteredPlants.map((plant) => (
                  <li key={plant.id} className="w-full">
                    <AdminPlantCard
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
              <p>No plants found</p>
            )
          ) : (
            <p>Loading</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Settings;

export const getServerSideProps = async (context: { locale: any }) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
