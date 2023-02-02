import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import App from "./App";
import { WindowProvider } from "./contexts/WindowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <AuthProvider>
      <WindowProvider>
        <App />
      </WindowProvider>
    </AuthProvider>
  </Router>
);
