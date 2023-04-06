import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[url(./assets/bg-1.jpeg)] bg-no-repeat bg-center bg-cover w-screen h-screen relative"></div>
  );
}

export default App;
