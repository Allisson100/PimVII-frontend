import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globalStyles.css";
import RouterApp from "./routes";
import ContextProviders from "./contexts";
import SnackBar from "./components/SnackBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProviders>
      <SnackBar />
      <RouterApp />
    </ContextProviders>
  </React.StrictMode>
);
