import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./views/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <span>Data provided by Marvel. © 2014 Marvel</span>
    </>
  );
}

export default App;
