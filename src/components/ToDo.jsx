import { MdFormatListBulletedAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import {
  motion,
  AnimatePresence,
  Reorder,
  useMotionValue,
} from "framer-motion";
import { useState } from "react";

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

export default function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [addButtonDisbaled, setAddButtonDisbaled] = useState(false);

  const addTaskRow = () => {
    setAddButtonDisbaled(true);
    const element = document.getElementById("todo-wrapper");
    element.scrollIntoView({ behavior: "smooth", block: "end" });
    setTasks([
      ...tasks,
      { id: "task" + new Date().getTime(), complete: false, task: "" },
    ]);
  };

  const updateTask = (e, id) => {
    setAddButtonDisbaled(false);
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.task = e.target.value;
      }
      return task;
    });
    newTasks.find((task) => task.task === "") ||
      (newTasks.length === 0 && setAddButtonDisbaled(true));
    setTasks(newTasks);
  };

  const toggleTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.complete = !task.complete;
      }
      return task;
    });
    console.log("newTasks", newTasks);
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <AnimatePresence initial={false}>
      <div className="absolute bottom-5 left-10 w-[300px]">
        <Reorder.Group
          id="todo-wrapper"
          axis="y"
          onReorder={setTasks}
          values={tasks}
          className="max-h-[280px] overflow-scroll"
        >
          {tasks &&
            tasks.length > 0 &&
            tasks.map((task) => (
              <Reorder.Item key={task.id} value={task}>
                <Task
                  task={task}
                  updateTask={updateTask}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
              </Reorder.Item>
            ))}
        </Reorder.Group>
        <div
          className={`flex justify-center items-center bg-black-overlay px-4 py-2 mt-2 rounded-full hover:shadow-white-glow max-w-fit ${
            addButtonDisbaled ? "cursor-default opacity-50" : "cursor-pointer"
          }`}
        >
          <MdFormatListBulletedAdd />
          <button
            className={`ml-2`}
            onClick={() => addTaskRow()}
            type="button"
            disabled={addButtonDisbaled}
          >
            Add a task
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
}

const Task = ({ task, updateTask, toggleTask, deleteTask }) => {
  const y = useMotionValue(0);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 2 } }}
      whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
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
