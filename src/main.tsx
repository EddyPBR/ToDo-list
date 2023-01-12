import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { startMirageServer } from "./__mock__";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.env.MODE === "development") startMirageServer();
