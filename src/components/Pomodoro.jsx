import { useEffect, useState, useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

const list = ["Pomodoro", "Long break", "Short break"];
const timerList = {
  Pomodoro: 25,
  "Long break": 15,
  "Short break": 5,
};

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

const Label = ({ text }) => {
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={text}
        initial={{ x: -150 }}
        animate={{
          x: 0,
          transition: { delay: 0.3, duration: 0.3 },
        }}
        exit={{ x: 150, transition: { duration: 0.3 } }}
      >
        {text}
      </motion.div>
    </AnimatePresence>
  );
};

const Clock = ({ active }) => {
  const [timeLeft, setTimeLeft] = useState();
  const [paused, setPaused] = useState(true);

  const controls = useAnimationControls();

  const getTimeLeftFromSec = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes < 10 ? "0" + minutes : minutes} : ${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  useInterval(
    () => {
      if (!paused) {
        console.log("is paused ? ", paused, timeLeft);
        setTimeLeft((prev) => {
          if (prev <= 1) {
            console.log("clearInterval");
            // clearInterval(int);
            return 0;
          }
          return prev - 1;
        });
      }
    },
    paused ? null : 1000
  );

  useEffect(() => {
    setTimeLeft(timerList[active]);
    if (!paused) {
      controls.start("visible");
    }
  }, [active]);

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
        return () => clearInterval(id);
      }
    }, [delay]);
  }

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
      console.log("active", active);
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
    nono: {
      pathLength: 1,
      strokeWidth: 5,
      opacity: 1,
      transition: {
        ease: "linear",
        pathLength: { duration: 25, bounce: 0 },
        opacity: { duration: 0.01 },
      },
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
        animate="nono"
        onClick={togglePlay}
        // className={"bg-black"}
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
        {/* <circle cx="55" cy="55" r="53" stroke="#ffffff3b" fill="none" /> */}
        <text x="50%" y="55%" textAnchor="middle" fill="white">
          {getTimeLeftFromSec(timeLeft)}
        </text>
      </motion.svg>
    </div>
  );
};
