import { BsCalendarDate } from "react-icons/bs";
import { GoBook } from "react-icons/go";
import { BsSpotify } from "react-icons/bs";

export default function Menu({ setShowReadingList }) {
  return (
    <div className="absolute right-10 top-10 text-white text-2xl rounded-md overflow-hidden">
      <Wrapper>
        <BsCalendarDate className="hover:scale-110 ease-in duration-300" />
      </Wrapper>
      <Wrapper>
        <GoBook
          className="hover:scale-110 ease-in duration-300"
          onClick={() => {
            setShowReadingList((prev) => !prev);
          }}
        />
      </Wrapper>
      <Wrapper>
        <BsSpotify className="hover:scale-110 ease-in duration-300" />
      </Wrapper>
    </div>
  );
}

const Wrapper = ({ children }) => {
  return (
    <div className="p-3 hover:shadow-white-glow bg-black-overlay">
      {children}
    </div>
  );
};
