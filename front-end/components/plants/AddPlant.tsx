import styles from "@/styles/myplants.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import PlantService from "@/services/PlantService";
import { useTranslation } from "react-i18next";

type AddPlantProps = {
  onAddPlant: () => void;
  onClose: () => void;
};

const AddPlant: React.FC<AddPlantProps> = ({ onAddPlant, onClose }) => {
  const [plantType, setPlantType] = useState("");
  const [family, setFamily] = useState("");
  const [wateringFreq, setWateringFreq] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [emailReminder, setEmailReminder] = useState(false);
  const [smsReminder, setSmsReminder] = useState(false);
  const { t } = useTranslation();

  const handleReminderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === "email") {
      setEmailReminder(checked);
    } else if (name === "sms") {
      setSmsReminder(checked);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const plantData = {
      plantType,
      family,
      wateringFreq,
      sunlight,
      reminders: {
        email: emailReminder,
        sms: smsReminder,
      },
    };

    try {
      await PlantService.addPlant(plantData);
      onAddPlant();
      onClose();
      setPlantType("");
      setFamily("");
      setWateringFreq("");
      setSunlight("");
      setEmailReminder(false);
      setSmsReminder(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={`${styles.addContainer}`} onSubmit={handleSubmit}>
      <h3>{t("addPlant.add_new_plant")}</h3>
      <label>{t("addPlant.type_plant")}</label>
      <input
        type="text"
        value={plantType}
        onChange={(e) => setPlantType(e.target.value)}
        required
      />
      <label>{t("addPlant.family")}</label>
      <input
        type="text"
        value={family}
        onChange={(e) => setFamily(e.target.value)}
        required
      />
      <label>{t("addPlant.watering_frequency")}</label>
      <select
        value={wateringFreq}
        onChange={(e) => setWateringFreq(e.target.value)}
        required
      >
        <option value="">{t("addPlant.select_frequency")}</option>
        <option value="daily">{t("addPlant.every_day")}</option>
        <option value="weekly">{t("addPlant.once_week")}</option>
        <option value="biweekly">{t("addPlant.once_two_week")}</option>
        <option value="monthly">{t("addPlant.once_month")}</option>
        <option value="never">{t("addPlant.never")}</option>
      </select>

      <label>{t("addPlant.amount_sunlight")}</label>
      <select
        value={sunlight}
        onChange={(e) => setSunlight(e.target.value)}
        required
      >
        <option value="">{t("addPlant.select_sunlight")}</option>
        <option value="low">{t("addPlant.low")}</option>
        <option value="medium">{t("addPlant.medium")}</option>
        <option value="high">{t("addPlant.high")}</option>
      </select>

      <div className={`${styles.checkboxContainer}`}>
        <label>
          <input
            type="checkbox"
            name="email"
            checked={emailReminder}
            onChange={handleReminderChange}
          />
          {t("addPlant.email")}
        </label>

        <label>
          <input
            type="checkbox"
            name="sms"
            checked={smsReminder}
            onChange={handleReminderChange}
          />
          {t("addPlant.sms")}
        </label>
      </div>
      <button type="submit">{t("addPlant.add_plant")}</button>
    </form>
  );
};

export default AddPlant;
