import { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight, AiFillSound } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Clock from "./Clock";
import Label from "./Label";
import TimerSettings from "./TimerSettings";

const list = ["Pomodoro", "Long break", "Short break"];
const initTimers = {
  Pomodoro: 25,
  "Short Break": 5,
  "Long Break": 15,
};

export default function Pomodoro() {
  const [active, setActive] = useState("Pomodoro");
  const [timers, setTimers] = useState(initTimers);

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

  const updateTimer = (timerType, updatedTime) => {
    console.log("update time : ", timerType, updatedTime);
    setTimers((prev) => {
      prev[timerType] = updatedTime;
      console.log("NEW TIMES : ", prev);
      return prev;
    });
  };

  return (
    <div className="absolute left-10 top-10 text-white font-thin flex flex-col items-center bg-black-overlay py-4 px-8 rounded-md">
      <div className="flex items-center mb-4">
        <AiFillCaretLeft onClick={prev} />
        <div className="w-[120px] overflow-hidden justify-center px-2 flex whitespace-nowrap">
          <Label text={active} />
        </div>
        <AiFillCaretRight onClick={next} />
      </div>
      <Clock active={active} />
      <div className="w-full mt-8 flex justify-between">
        <FiSettings />
        <AiFillSound />
      </div>
      <div className="w-full text-sm mt-4">
        <TimerSettings
          label={"Pomodoro"}
          time={timers["Pomodoro"]}
          updateTimer={updateTimer}
        />
        <TimerSettings
          label={"Short Break"}
          time={timers["Short Break"]}
          updateTimer={updateTimer}
        />
        <TimerSettings
          label={"Long Break"}
          time={timers["Long Break"]}
          updateTimer={updateTimer}
        />
      </div>
    </div>
  );
}
