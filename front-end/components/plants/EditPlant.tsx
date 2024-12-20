import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import PlantService from "@/services/PlantService";
import { useTranslation } from "react-i18next";
import { FaPencil, FaPlus, FaXmark } from "react-icons/fa6";
import UserService from "@/services/UserService";
import { Plant, User } from "@/types/types";
import { useNotifications } from "../utils/notifications";

type EditPlantProps = {
  plant: Plant;
  onEditPlant: () => void;
  onEditClose: () => void;
};

const AddPlant: React.FC<EditPlantProps> = ({
  plant,
  onEditClose,
  onEditPlant,
}) => {
  const [name, setName] = useState(plant.name);
  const [type, setType] = useState(plant.type);
  const [family, setFamily] = useState(plant.family);
  const [wateringFreq, setWateringFreq] = useState(plant.wateringFreq);
  const [sunlight, setSunlight] = useState(plant.sunlight);
  const [user, setUser] = useState<User | undefined>(plant.user);
  const [reminderEmail, setEmailReminder] = useState(plant.email ?? false);
  const [reminderSms, setSmsReminder] = useState(plant.sms ?? false);
  const { t } = useTranslation();
  const { sendNotification } = useNotifications();

  const handleClose = () => {
    onEditClose();
  };

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
    const editedPlantData = {
      ...plant,
      name,
      type,
      family,
      wateringFreq,
      sunlight,
      user,
      reminderEmail,
      reminderSms,
    };

    try {
      if (plant.id === undefined) {
        sendNotification(`${t("editPlant.cant_find")}`, "error");
        return;
      }
      await PlantService.editPlant(plant.id, editedPlantData);
      onEditPlant();
      onEditClose();
      sendNotification(`${t("editPlant.edit_success")}: ${name}`, "success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-90 z-40"></div>
      <form
        className="bg-zinc-800 z-50 rounded-md border-2 p-4 w-[30rem]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-semibold">{t("editPlant.edit_title")}</h1>
          <button
            className="flex flex-row hover:underline"
            onClick={handleClose}
          >
            <FaXmark className="mt-[5px] mr-0.5" />
            {t("addPlant.cancel")}
          </button>
        </div>
        <hr className="mb-4 mt-2" />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col italic font-semibold gap-1">
            <label className="text-sm">{t("addPlant.name_plant")}</label>
            <input
              className="bg-transparent border-b border-zinc-600 outline-none p-0.5 font-normal"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col italic font-semibold gap-1">
            <label className="text-sm">{t("addPlant.type_plant")}</label>
            <input
              className="bg-transparent border-b border-zinc-600 outline-none p-0.5 font-normal"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col italic font-semibold gap-1">
            <label className="text-sm">{t("addPlant.family")}</label>
            <input
              className="bg-transparent border-b border-zinc-600 outline-none p-0.5 font-normal"
              type="text"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col italic font-semibold gap-1">
            <label className="text-sm">
              {t("addPlant.watering_frequency")}
            </label>
            <select
              className="bg-transparent border-zinc-600 focus:bg-zinc-700 rounded-t-md font-normal border-b outline-none py-0.5"
              value={wateringFreq}
              onChange={(e) => setWateringFreq(e.target.value)}
              required
            >
              <option value="daily">{t("addPlant.every_day")}</option>
              <option value="2-days">{t("addPlant.once_two_days")}</option>
              <option value="3-days">{t("addPlant.once_three_days")}</option>
              <option value="weekly">{t("addPlant.once_week")}</option>
              <option value="2-weeks">{t("addPlant.once_two_week")}</option>
              <option value="monthly">{t("addPlant.once_month")}</option>
              <option value="never">{t("addPlant.never")}</option>
            </select>
          </div>
          <div className="flex flex-col italic font-semibold gap-1">
            <label className="text-sm">{t("addPlant.amount_sunlight")}</label>
            <select
              className="bg-transparent border-zinc-600 focus:bg-zinc-700 rounded-t-md font-normal border-b outline-none py-0.5"
              value={sunlight}
              onChange={(e) => setSunlight(e.target.value)}
              required
            >
              <option value="low">{t("addPlant.low")}</option>
              <option value="medium">{t("addPlant.medium")}</option>
              <option value="high">{t("addPlant.high")}</option>
            </select>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col italic font-semibold gap-1">
              <label className="text-sm">Reminders:</label>
              <div className="flex flex-row gap-5">
                <div className="not-italic flex flex-row">
                  <input
                    className="w-3.5 h-3.5 mr-2 mt-1.5"
                    type="checkbox"
                    name="email"
                    checked={reminderEmail}
                    onChange={handleReminderChange}
                  />
                  {t("addPlant.email")}
                </div>
                <div className="not-italic flex flex-row">
                  <input
                    className="w-3.5 h-3.5 mr-2 mt-1.5"
                    type="checkbox"
                    name="sms"
                    checked={reminderSms}
                    onChange={handleReminderChange}
                  />
                  {t("addPlant.sms")}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-[1px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 pb-1"
            >
              <FaPencil className="mr-1 mt-1" />
              {t("editPlant.edit_plant")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPlant;
// ROOTZ (Simon Denruyter / Ewout Servranckx)
