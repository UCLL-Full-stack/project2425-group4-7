import { Plant, User } from "@/types/types";
import { useEffect, useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { useNotifications } from "../utils/notifications";

type PlantCardProps = {
  plant: Plant;
};

const AdminPlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const { sendNotification } = useNotifications();

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
        `${days > 0 ? `${days}d ` : ""}${hours}h, ${minutes}m, ${seconds}s`
      );
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [plant.wateringFreq, plant.created]);

  return (
    <div className="bg-white border border-white py-4 px-3 bg-opacity-15 shadow-md rounded-md flex flex-row w-full">
      <div className="mx-4 w-full">
        <div className="flex flex-row justify-between">
          <h2 className="text-white font-bold text-md my-1">
            {plant.user.username} ({plant.user.email})
          </h2>
          <div className=" flex flex-row mt-[7px]">
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
            <strong>Name</strong>
            <p>{plant.name}</p>
          </div>
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
          <div className="text-sm">
            <strong>Next Watering</strong>
            <p>{timeLeft}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPlantCard;
