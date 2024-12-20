import Link from "next/link";
import { FaCog, FaHome, FaLeaf } from "react-icons/fa";
import LoginForm from "../login/loginform";
import {
  FaArrowRightToBracket,
  FaBars,
  FaRightFromBracket,
  FaUserShield,
  FaXmark,
} from "react-icons/fa6";
import LanguageDropdown from "./langdrop";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { getUserRole, logout, useAuth } from "@/components/auth/auth";
import { useNotifications } from "./notifications";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const authenticated = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const { sendNotification } = useNotifications();
  const [role, setRole] = useState<string | null>(null);
  const [sideNavVisible, setSideNavVisible] = useState(false);

  const toggleSideNav = () => {
    setSideNavVisible(!sideNavVisible);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    sendNotification(`${t("header.notification")}`, "success");
  };

  useEffect(() => {
    const updateRole = () => {
      setRole(getUserRole());
    };
    updateRole();

    window.addEventListener("storage", updateRole);

    return () => {
      window.removeEventListener("storage", updateRole);
    };
  }, []);

  return (
    <header className="flex justify-between items-start py-4 px-6 border-b-3 border-black">
      <div className="flex-row justify-center items-center hidden xl:flex">
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
          {role === "admin" && (
            <Link
              href="/admin"
              className="px-6 pb-2 text-[20px] font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
            >
              <FaUserShield className="mt-[4.1px] mr-2 text-[23px]" />
              {t("header.admin")}
            </Link>
          )}
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
      <div className="xl:hidden w-full">
        <div className="flex flex-row w-full">
          <div className="flex-grow"></div>
          <FaBars
            size={40}
            className="text-white cursor-pointer"
            onClick={toggleSideNav}
          />
        </div>
        <div
          className={`fixed right-0 top-0 w-full h-full bg-black bg-opacity-50 z-10 flex flex-row ${
            sideNavVisible ? "block" : "hidden"
          }`}
        >
          <div className="w-full"></div>
          <nav className="text-white bg-zinc-800 top-0 right-0 flex flex-col flex-shrink-0 w-[15.3rem] shadow-xl">
            <div className="flex flex-row">
              <img
                src={`/rootzlogo2.png`}
                alt="CvExpress Logo"
                className="w-[10rem] ml-5 mt-5 mb-6"
              />
              <FaXmark
                size={32}
                className="cursor-pointer mt-[1.5rem] ml-[0.8rem] text-white"
                onClick={toggleSideNav}
              />
            </div>
            <hr className="mb-5" />
            {role === "admin" && (
              <Link
                href="/admin"
                className="py-3 px-6 text-[20px] font-semibold flex flex-row hover:bg-zinc-700 after:transition-all after:duration-300"
              >
                <FaUserShield className="mt-[4.1px] mr-2 text-[23px]" />
                {t("header.admin")}
              </Link>
            )}
            {authenticated ? (
              <>
                <Link
                  href="/myplants"
                  className="py-3 px-6 text-[20px] font-semibold flex flex-row hover:bg-zinc-700 after:transition-all after:duration-300"
                >
                  <FaLeaf className="mt-[4.1px] mr-2 text-[23px]" />
                  {t("header.myPlants")}
                </Link>
                <LanguageDropdown />
                <Link
                  href="/settings"
                  className="py-3 px-6 text-[20px] font-semibold flex flex-row hover:bg-zinc-700 after:transition-all after:duration-300"
                >
                  <FaCog className="mt-[4.1px] mr-2 text-[23px]" />
                  {t("header.settings")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-3 px-6 text-[20px] font-semibold flex flex-row hover:bg-zinc-700 after:transition-all after:duration-300"
                >
                  <FaRightFromBracket className="mt-[4.1px] mr-2 text-[23px]" />
                  {t("header.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="py-3 px-6 text-[20px] font-semibold flex flex-row hover:bg-zinc-700 after:transition-all after:duration-300"
                >
                  <FaHome className="mt-[4.1px] mr-2 text-[23px]" />
                  {t("header.home")}
                </Link>
                <LanguageDropdown />
                <Link
                  href="/login"
                  className="py-3 px-6 text-[20px] font-semibold flex flex-row hover:bg-zinc-700 after:transition-all after:duration-300"
                >
                  <FaArrowRightToBracket className="mt-[4.1px] mr-2 text-[23px]" />
                  {t("header.login")}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
// ROOTZ (Simon Denruyter / Ewout Servranckx)
