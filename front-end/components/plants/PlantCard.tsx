import { Plant } from "@/types/types";
import { useTranslation } from "react-i18next";

type PlantCardProps = {
  plant: Plant;
};
const { t } = useTranslation();

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  return (
    <div>
      <h2>{plant.name}</h2>
      <p>
        <strong>{t("plantCard.type")}</strong> {plant.type}
      </p>
      <p>
        <strong>{t("plantCard.family")}</strong> {plant.family}
      </p>
      <p>
        <strong>{t("plantCard.watering_frequency")}</strong>{" "}
        {plant.wateringFreq}
      </p>
      <p>
        <strong>{t("plantCard.sunlight")}</strong> {plant.sunlight}
      </p>
      <p>
        <strong>{t("plantCard.email_reminder")}</strong>{" "}
        {plant.email ? `${t("plantCard.yes")}` : `${t("plantCard.no")}`}
      </p>
      <p>
        <strong>{t("plantCard.sms_reminder")}</strong>{" "}
        {plant.sms ? `${t("plantCard.yes")}` : `${t("plantCard.no")}`}
      </p>
    </div>
  );
};

export default PlantCard;
