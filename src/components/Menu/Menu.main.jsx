import { BsCalendarDate } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { BsSpotify } from "react-icons/bs";

export default function Menu() {
  return (
    <div className="absolute right-10 top-10 text-white bg-black-overlay text-2xl rounded-md p-2">
      <div className="p-2 hover:scale-110 ease-in duration-300 hover:shadow">
        <BsCalendarDate />
      </div>
      <div className="p-2 hover:scale-110 ease-in duration-300 hover:shadow">
        <GoBook />
      </div>
      <div className="p-2 hover:scale-110 ease-in duration-300 hover:shadow">
        <BsSpotify />
      </div>
    </div>
  );
}
