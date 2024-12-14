import Link from "next/link";
import { FaCog, FaHome, FaLeaf } from "react-icons/fa";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-start py-6 px-6">
      <div className="flex flex-row justify-center items-center">
        <Link href="/">
          {
            <img
              src="/rootzlogo2.png"
              alt="Rootz Logo"
              className="w-[13rem] ml-3"
            />
          }
        </Link>
        <nav className="space-x-4 mt-1 ml-[3.3vw] text-white flex flew-row">
          <Link
            href="/"
            className="px-6 pb-2 text-[20px] font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
          >
            <FaHome className="mt-[4.1px] mr-2 text-[23px]" />
            Home
          </Link>
          <Link
            href="/myplants"
            className="px-6 pb-2 text-[20px] font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
          >
            <FaLeaf className="mt-[4.1px] mr-2 text-[23px]" />
            My Plants
          </Link>
          <Link
            href="/settings"
            className="px-6 pb-2 text-[20px] font-semibold rounded-lg flex flex-row after:bg-white relative after:absolute after:h-0.5 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
          >
            <FaCog className="mt-[4.1px] mr-2 text-[23px]" />
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
