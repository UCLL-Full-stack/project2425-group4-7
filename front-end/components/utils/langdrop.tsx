import { useState } from "react";
import { FaLanguage } from "react-icons/fa";
import { i18n } from "next-i18next";
import router from "next/router";

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState("nl");

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (value) => {
    setLocale(value);
    const new_locale = value;
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: new_locale });
    //i18n.changeLanguage(value);
    setIsOpen(false);
  };

  return (
    <div className="space-x-4 xl:ml-[55px] xl:text-white flex flew-row relative">
      <button
        className={`w-full py-3 xl:py-0 px-[1.35rem] xl:px-6 text-[20px] hover:bg-slate-200 xl:hover:bg-transparent font-semibold xl:rounded-lg flex flex-rows after:bg-black xl:after:bg-white xl:relative xl:after:absolute xl:after:h-1 xl:after:w-0 xl:after:bottom-0 xl:after:left-0 xl:hover:after:w-full xl:after:transition-all xl:after:duration-300 ${
          isOpen ? "after:w-full" : "after:w-0"
        }`}
        onClick={handleToggle}
      >
        <FaLanguage className="mr-1.5 xl:mr-2 text-[27px] mt-0.5 flex-shrink-0" />
        {locale === "en" ? "English" : "Nederlands"}
      </button>

      {isOpen && (
        <ul className="absolute top-[-3.5rem] xl:top-0 left-[-10.5rem] xl:left-[-18.5%] bg-white text-black rounded-lg shadow-lg mt-14 xl:w-[120%]">
          <li
            className="px-3 py-3 hover:bg-gray-100 cursor-pointer rounded-t-lg flex flew-row"
            onClick={() => handleSelect("en")}
          >
            <img
              src="/flags/gb.png"
              className="w-8 rounded mr-2 opacity-85"
              alt=""
            />
            English
          </li>
          <li
            className="px-3 py-3 hover:bg-gray-100 cursor-pointer rounded-b-lg flex flew-row"
            onClick={() => handleSelect("nl")}
          >
            <img
              src="/flags/nl.png"
              className="w-8 rounded mr-2 opacity-85"
              alt=""
            />
            Nederlands
          </li>
        </ul>
      )}
    </div>
  );
}
