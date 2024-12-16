import Link from "next/link";
import { FaCog, FaHome, FaLeaf } from "react-icons/fa";
import LoginForm from "../login/loginform";
import { FaArrowRightToBracket, FaRightFromBracket } from "react-icons/fa6";
import LanguageDropdown from "./langdrop";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getUserRole, logout, useAuth } from "@/components/auth/auth";
import { useNotifications } from "./notifications";

const Header: React.FC = () => {
  const authenticated = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const { sendNotification } = useNotifications();

  const handleLogout = () => {
    logout();
    router.push("/");
    sendNotification(`${t("header.notification")}`, "success");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <header className="flex justify-between items-start py-4 px-6 border-b-3 border-black">
      <div className="flex flex-row justify-center items-center">
        <Link href="/">
          {
            <img
              src="/rootzlogo2.png"
              alt="Rootz Logo"
              className="w-[10rem] ml-5"
            />
          }
        </Link>
        <nav className="space-x-4 mt-1 ml-7 text-white flex flew-row">
          {authenticated ? (
            <>
              <Link
                href="/myplants"
                className="px-6 pb-2 text-[20px] font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                <FaLeaf className="mt-[4.1px] mr-2 text-[23px]" />
                {t("header.myPlants")}
              </Link>
              <LanguageDropdown />
              <Link
                href="/settings"
                className="px-6 pb-2 text-[20px] font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                <FaCog className="mt-[4.1px] mr-2 text-[23px]" />
                {t("header.settings")}
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 pb-2 text-[20px] font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                <FaRightFromBracket className="mt-[4.1px] mr-2 text-[23px]" />
                {t("header.logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="px-6 pb-2 text-[20px] font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                <FaHome className="mt-[4.1px] mr-2 text-[23px]" />
                {t("header.home")}
              </Link>
              <LanguageDropdown />
              <Link
                href="/login"
                className="px-6 pb-2 text-[20px] font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
              >
                <FaArrowRightToBracket className="mt-[4.1px] mr-2 text-[23px]" />
                {t("header.login")}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
