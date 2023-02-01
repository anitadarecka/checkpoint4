import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import "./App.css";
import Charging from "./pages/Login/Charging";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/charging" element={<Charging />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
