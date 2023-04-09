import { useState } from "react";
import "./App.css";
import Title from "./components/Title";
import ToDo from "./components/ToDo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[url(./assets/bg-1.jpeg)] bg-no-repeat bg-center bg-cover w-screen h-screen relative text-white">
      <Title />
      <ToDo />
    </div>
  );
}

export default App;
