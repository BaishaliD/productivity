import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function Title() {
  const [greetings, setGreetings] = useState("");
  const [time, setTime] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    setTime(format(new Date(), "HH:mm"));
    setGreetings(getGreetings(new Date()));
    const intervalGreetings = setInterval(() => {
      const now = new Date();
      setGreetings(getGreetings(now));
    }, 60000); // update every minute

    const intervalTime = setInterval(() => {
      setTime(format(new Date(), "HH:mm"));
    }, 1000); // update every second

    return () => {
      clearInterval(intervalGreetings);
      clearInterval(intervalTime);
    };
  }, []);

  const getGreetings = (now) => {
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    }
    return "Good evening";
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
      <div className="font-thin flex flex-col items-center bg-black-overlay py-4 px-8 rounded-xl">
        <div className="text-9xl">{time}</div>
        {greetings && <h1 className="text-4xl">{greetings}, Baishali</h1>}
      </div>
      <div className="border-b border-white w-[400px] mt-8">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What is your goal for today?"
          className="bg-transparent border-none p-2 text-2xl text-white placeholder-white font-thin w-full text-center focus:outline-none"
        />
      </div>
    </div>
  );
}
