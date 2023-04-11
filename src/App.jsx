import { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Todo from "./components/Todo/Todo.main";
import Pomodoro from "./components/Pomodoro/Pomodoro.main";

function App() {
  return (
    <div className="bg-[url(./assets/bg-1.jpeg)] bg-no-repeat bg-center bg-cover w-screen h-screen relative text-white">
      <Title />
      <Todo />
      <Pomodoro />
    </div>
  );
}

export default App;
