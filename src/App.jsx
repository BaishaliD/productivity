import { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import Todo from "./components/Todo/Todo.main";
import Pomodoro from "./components/Pomodoro/Pomodoro.main";
import Menu from "./components/Menu/Menu.main";
import ReadingList from "./components/ReadingList/ReadingList.main";

function App() {
  const [showReadingList, setShowReadingList] = useState(false);

  return (
    <div className="bg-[url(./assets/bg-1.jpeg)] bg-no-repeat bg-center bg-cover w-screen h-screen relative text-white">
      <Menu setShowReadingList={setShowReadingList} />
      <Title />
      <Todo />
      <Pomodoro />
      {showReadingList && (
        <ReadingList setShowReadingList={setShowReadingList} />
      )}
    </div>
  );
}

export default App;
