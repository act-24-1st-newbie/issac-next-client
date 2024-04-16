import Image from "next/image";
import Link from "next/link";

const today = new Date();
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekDay = daysOfWeek[today.getDay()];
const formattedDate = `${("0" + (today.getMonth() + 1)).slice(-2)}/ ${today.getDate()}일 (${weekDay})`;

const Header: React.FC = () => {

  return (
    <header className="flex h-10 py-2 px-6 justify-between bg-[#6c77a7] max-w-screen items-center">
      <div className="h-10">
        <Link className="flex items-center" href="/login">
          <Image
            className="w-10 h-10 p-2 hover:cursor-pointer hover:text-red-500"
            src="/img/ic_topbar_menu.png"
            width={24}
            height={24}
            alt="logo"
          />
          <p className="w-20 h-8 font-roboto text-xl font-bold text-left text-white" >
            My Todo
          </p></Link>
      </div>
      <div className="w-48 h-8 flex items-center gap-2">
        <div className="font-roboto text-l font-bold leading-6 text-right text-white">{formattedDate}</div>
        <Link href="/login">
          <button className="w-auto h-8 p-1 gap-2.5 rounded-lg border border-solid border-white font-roboto text-sm bg-[#6c77a7] leading 4 font-normal text-left text-white"  >
            Sign Up
          </button></Link>
      </div>
    </header >
  );
};

export default Header;
