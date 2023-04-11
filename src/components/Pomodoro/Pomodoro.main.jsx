import { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Clock from "./Clock";
import Label from "./Label";

const list = ["Pomodoro", "Long break", "Short break"];

export default function Pomodoro() {
  const [active, setActive] = useState("Pomodoro");

  const prev = () => {
    //set the previous item of list as active item
    list.indexOf(active) > 0
      ? setActive(list[list.indexOf(active) - 1])
      : setActive(list[list.length - 1]);
  };

  const next = () => {
    //set the next item of list as active item
    list.indexOf(active) < list.length - 1
      ? setActive(list[list.indexOf(active) + 1])
      : setActive(list[0]);
  };

  return (
    <div className="absolute left-10 top-10 text-white">
      <div className="font-thin flex flex-col items-center bg-black-overlay py-4 px-8 rounded-xl">
        <div className="flex items-center mb-4">
          <AiFillCaretLeft onClick={prev} />
          <div className="w-[120px] overflow-hidden justify-center px-2 flex whitespace-nowrap">
            <Label text={active} />
          </div>
          <AiFillCaretRight onClick={next} />
        </div>
        <Clock active={active} />
      </div>
    </div>
  );
}
