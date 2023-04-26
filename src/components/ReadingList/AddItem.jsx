import { RxCheck, RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AddItem({ setShowAddBox }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  return (
    <div className="p-4 text-sm">
      <div className="flex items-center justify-end">
        <div className="flex justify-center items-center p-1 bg-transparent hover:bg-white-overlay rounded-full mx-1">
          <RxCheck className="text-lg" />
        </div>
        <div
          className="flex justify-center items-center p-1 bg-transparent hover:bg-white-overlay bg-black rounded-full"
          onClick={() => {
            setShowAddBox(false);
          }}
        >
          <RxCross2 className="text-lg" />
        </div>
      </div>
      <input
        className="bg-transparent focus:border-none w-full focus:outline-none p-1"
        placeholder="Title"
      />
      <MotionLine />
      <input
        className="bg-transparent focus:border-none w-full focus:outline-none p-1"
        placeholder="URL"
      />
      <MotionLine />
      <input
        className="bg-transparent focus:border-none w-full focus:outline-none p-1"
        placeholder="Author"
      />
      <MotionLine />
    </div>
  );
}

const MotionLine = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.2, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: 0.2, duration: 0.01 },
      },
    },
  };
  return (
    <motion.svg
      width="100%"
      height="1"
      viewBox="0 0 100% 1"
      initial="hidden"
      animate="visible"
      className={"mb-2"}
    >
      <motion.line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke="#ffffff"
        strokeWidth={3}
        variants={draw}
      />
    </motion.svg>
  );
};
