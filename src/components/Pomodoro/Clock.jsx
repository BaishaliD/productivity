import { useEffect, useState, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";

const timerList = {
  Pomodoro: 25,
  "Long break": 15,
  "Short break": 5,
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        console.log("clear interval in hook");
        clearInterval(id);
      };
    }
  }, [delay]);
}

const Clock = ({ active }) => {
  const [timeLeft, setTimeLeft] = useState();
  const [paused, setPaused] = useState(true);

  const controls = useAnimationControls();

  useEffect(() => {
    setTimeLeft(timerList[active]);
    if (!paused) {
      controls.start("visible");
    }
  }, [active]);

  useInterval(
    () => {
      if (!paused) {
        console.log("is paused ? ", paused, timeLeft);
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setPaused(true);
            return 0;
          }
          return prev - 1;
        });
      }
    },
    paused ? null : 1000
  );

  const getTimeLeftFromSec = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes < 10 ? "0" + minutes : minutes} : ${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const togglePlay = () => {
    if (paused) {
      controls.start("visible");
    } else {
      controls.stop();
    }
    setPaused((prev) => !prev);
  };

  const draw = {
    hidden: { pathLength: 0 },
    visible: (active) => {
      const timeInSec = timerList[active];
      return {
        pathLength: 1,
        strokeWidth: 5,
        opacity: 1,
        transition: {
          ease: "linear",
          pathLength: { duration: timeInSec, bounce: 0 },
          opacity: { duration: 0.01 },
        },
      };
    },
  };
  return (
    <div className="relative">
      <div
        className="absolute w-[110px] h-[110px] top-0 left-0 z-50 text-3xl hover:bg-black-overlay shadow-white-glow rounded-full"
        onClick={togglePlay}
      >
        <div className="h-full w-full flex justify-center items-center opacity-0 hover:opacity-100">
          {paused ? <BsFillPlayCircleFill /> : <BsFillPauseCircleFill />}
        </div>
      </div>
      <motion.svg
        width="110"
        height="110"
        initial="hidden"
        onClick={togglePlay}
      >
        <circle cx="55" cy="55" r="47" stroke="#ffffff3b" fill="none" />
        <motion.circle
          cx="55"
          cy="55"
          r="50"
          stroke="#63ddec"
          fill="none"
          initial="hidden"
          variants={draw}
          custom={active}
          animate={controls}
          key={active}
        />
        <text x="50%" y="55%" textAnchor="middle" fill="white">
          {getTimeLeftFromSec(timeLeft)}
        </text>
      </motion.svg>
    </div>
  );
};

export default Clock;
