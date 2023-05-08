import { MdFormatListBulletedAdd } from "react-icons/md";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useState } from "react";
import Task from "./Task";

export default function Todo() {
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
    <motion.div className="absolute bottom-5 left-10 w-[300px]">
      <Reorder.Group
        id="todo-wrapper"
        axis="y"
        onReorder={setTasks}
        values={tasks}
        className="max-h-[280px] overflow-scroll"
      >
        <AnimatePresence>
          {tasks &&
            tasks.length > 0 &&
            tasks.map((task) => (
              <Reorder.Item key={task.id} value={task}>
                <Task
                  key={task.id}
                  task={task}
                  updateTask={updateTask}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
              </Reorder.Item>
            ))}
        </AnimatePresence>
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
    </motion.div>
  );
}
