import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const Task = ({ task, updateTask, toggleTask, deleteTask }) => {
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        rotateZ: 5,
        y: 200,
        opacity: 0,
        transition: {
          y: { delay: 0.1, stiffness: 1000, duration: 0.8 },
          rotateZ: { duration: 0.5 },
          opacity: { duration: 0.8 },
        },
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="w-full bg-black-overlay p-2 my-2 flex items-center"
    >
      <div
        className="border border-white w-6 h-5 cursor-pointer hover:shadow-sm"
        onClick={() => toggleTask(task.id)}
      >
        {task.complete && ( // if task is complete, show a checkmark
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 16.2L4.8 12L3.6 13.2L9 18.6L20.4 7.19999L19.2 6L9 16.2Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <div className="ml-2 flex-grow">
        {task.complete ? (
          <div className="p-1 opacity-50 line-through flex items-center">
            <div className="flex-grow">{task.task}</div>
            <RxCross2
              className="text-lg font-bold"
              onClick={() => deleteTask(task.id)}
            />
          </div>
        ) : (
          <input
            className="bg-transparent focus:border-none w-full focus:outline-none p-1"
            value={task.task}
            onChange={(e) => updateTask(e, task.id)}
          />
        )}
        <motion.svg
          width="100%"
          height="1"
          viewBox="0 0 100% 1"
          initial="hidden"
          animate="visible"
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
      </div>
    </motion.div>
  );
};

export default Task;
