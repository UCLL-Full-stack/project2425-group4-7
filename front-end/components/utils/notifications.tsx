import {
  useState,
  useEffect,
  ReactNode,
  useRef,
  createContext,
  useContext,
} from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { FaRegCircleCheck, FaRegCircleXmark, FaXmark } from "react-icons/fa6";

type NotificationType = "success" | "alert" | "error";

interface Notification {
  id: number;
  type: NotificationType;
  message: string;
}

interface NotificationContextProps {
  sendNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

const Notifications: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const sendNotification = (message: string, type: NotificationType) => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);
    setTimeout(() => {
      closeNotification(id);
    }, 4000);
  };

  const closeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const getNotificationType = (type: NotificationType) => {
    if (type === "success") {
      return {
        icon: (
          <FaRegCircleCheck
            size={30}
            className="text-green-700 mt-[-2px] mr-3"
          />
        ),
        title: "Success",
      };
    }
    if (type === "alert") {
      return {
        icon: (
          <FaExclamationCircle
            size={30}
            className="text-yellow-600 mt-[-2px] mr-3"
          />
        ),
        title: "Alert",
      };
    }
    if (type === "error") {
      return {
        icon: (
          <FaRegCircleXmark size={30} className="text-red-700 mt-[-2px] mr-3" />
        ),
        title: "Error",
      };
    }
    return { icon: null, title: "" };
  };

  return (
    <NotificationContext.Provider value={{ sendNotification }}>
      {children}
      <div className="fixed top-5 right-5 z-[900]">
        {notifications.map(({ id, message, type }) => {
          const { icon, title } = getNotificationType(type);
          return (
            <div
              key={id}
              className="animate-fadeIn flex flex-row mb-2 py-3 pl-4 w-80 bg-slate-50  text-black rounded-md shadow-md"
            >
              {icon}
              <div className="flex flex-col w-full">
                <span className="font-semibold">{title}</span>
                <span className="">{message}</span>
              </div>
              <button
                onClick={() => closeNotification(id)}
                className="h-min mr-3 hover:text-gray-800 cursor-pointer p-1"
              >
                <FaXmark />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export default Notifications;
// ROOTZ (Simon Denruyter / Ewout Servranckx)
