import { Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
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
      <div className="footer">
        <span style={{ fontSize: "1.3rem" }}>&#xA9;</span> 2023 anita darecka --{" "}
        <a href="mailto:anitadarecka@gmail.com">
          contact <FontAwesomeIcon icon={faEnvelope} />
        </a>
        &nbsp;all rights reserved.
      </div>
    </div>
  );
}

export default App;
