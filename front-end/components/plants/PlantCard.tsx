import { Plant } from "@/types/types";

type PlantCardProps = {
  plant: Plant;
};

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  return (
    <div>
      <h2>{plant.name}</h2>
      <p>
        <strong>Type:</strong> {plant.type}
      </p>
      <p>
        <strong>Family:</strong> {plant.family}
      </p>
      <p>
        <strong>Watering Frequency:</strong> {plant.wateringFreq}
      </p>
      <p>
        <strong>Sunlight:</strong> {plant.sunlight}
      </p>
      <p>
        <strong>Email Reminder:</strong> {plant.email ? "Yes" : "No"}
      </p>
      <p>
        <strong>SMS Reminder:</strong> {plant.sms ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default PlantCard;
