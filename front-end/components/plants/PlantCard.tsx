import { Plant, User } from "@/types/types";
import { useEffect, useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { useNotifications } from "../utils/notifications";
import { useTranslation } from "react-i18next";

type PlantCardProps = {
  plant: Plant;
};

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { sendNotification } = useNotifications();
  const { t } = useTranslation();

  const wateringIntervals: Record<string, number | null> = {
    daily: 24 * 60 * 60 * 1000,
    "2-days": 2 * 24 * 60 * 60 * 1000,
    "3-days": 3 * 24 * 60 * 60 * 1000,
    weekly: 7 * 24 * 60 * 60 * 1000,
    "2-weeks": 14 * 24 * 60 * 60 * 1000,
    monthly: 30 * 24 * 60 * 60 * 1000,
    "no-water": null,
  };

  useEffect(() => {
    const intervalMs = wateringIntervals[plant.wateringFreq];
    if (intervalMs === null) {
      setTimeLeft("Plant doesn't need water");
      return;
    }
    if (!intervalMs) {
      setTimeLeft("Invalid");
      return;
    }

    const plantCreatedAt = plant.created
      ? new Date(plant.created).getTime()
      : new Date().getTime();

    if (plantCreatedAt === null) {
      setTimeLeft(`No watering needed`);
      return;
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const correctTime = now + 2 * 60 * 60 * 1000;
      const elapsed = correctTime - plantCreatedAt;
      const remainingTime = intervalMs - (elapsed % intervalMs);
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      const minutes = Math.floor(
        (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
      );
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      setTimeLeft(
        `${
          days > 0 ? `${days} days, ` : ""
        }${hours} hours, ${minutes} minutes, ${seconds} seconds`
      );
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [plant.wateringFreq, plant.created]);

  return (
    <div className="bg-white border-[3px] border-white py-5 px-4 bg-opacity-15 shadow-md rounded-md flex flex-row">
      <img src="/plant-icon.png" className="h-[8.1rem] my-auto" alt="" />
      <div className="ml-4">
        <div className="flex flex-row">
          <h2 className="text-white font-bold text-lg my-1">{plant.name}</h2>
          <div className="ml-10 flex flex-row mt-[8px]">
            <button className="flex flex-row text-sm hover:underline">
              <FaPenToSquare className="mt-[3px] mr-1" />
              Edit
            </button>
            <button className="flex flex-row ml-3 text-sm hover:underline">
              <FaTrash className="mt-[3px] mr-1" />
              Delete
            </button>
          </div>
        </div>
        <hr className="my-1.5" />
        <div className="flex flex-row gap-6">
          <div className="text-sm">
            <strong>Type</strong>
            <p>{plant.type}</p>
          </div>
          <div className="text-sm">
            <strong>Family</strong>
            <p>{plant.family}</p>
          </div>
          <div className="text-sm">
            <strong>Sunlight</strong>
            <p>{plant.sunlight}</p>
          </div>
        </div>
        <hr className="my-1.5" />
        <div className="text-sm">
          <strong>Next Watering</strong>
          <p>{timeLeft}</p>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
