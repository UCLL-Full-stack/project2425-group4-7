import styles from "@/styles/myplants.module.css";
import { ChangeEvent, FormEvent, useState } from "react";
import PlantService from "@/services/PlantService";

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
      <h3>Adding a new plant</h3>
      <label>Type of Plant:</label>
      <input
        type="text"
        value={plantType}
        onChange={(e) => setPlantType(e.target.value)}
        required
      />
      <label>Family:</label>
      <input
        type="text"
        value={family}
        onChange={(e) => setFamily(e.target.value)}
        required
      />
      <label>Watering Frequency:</label>
      <select
        value={wateringFreq}
        onChange={(e) => setWateringFreq(e.target.value)}
        required
      >
        <option value="">Select watering frequency</option>
        <option value="daily">Every day</option>
        <option value="weekly">Once a week</option>
        <option value="biweekly">Once in 2 weeks</option>
        <option value="monthly">Once a month</option>
        <option value="never">Never</option>
      </select>

      <label>Amount of Sunlight:</label>
      <select
        value={sunlight}
        onChange={(e) => setSunlight(e.target.value)}
        required
      >
        <option value="">Select amount of sunlight</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className={`${styles.checkboxContainer}`}>
        <label>
          <input
            type="checkbox"
            name="email"
            checked={emailReminder}
            onChange={handleReminderChange}
          />
          Email
        </label>

        <label>
          <input
            type="checkbox"
            name="sms"
            checked={smsReminder}
            onChange={handleReminderChange}
          />
          SMS
        </label>
      </div>
      <button type="submit">Add Plant</button>
    </form>
  );
};

export default AddPlant;
