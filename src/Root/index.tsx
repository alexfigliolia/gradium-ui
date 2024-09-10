import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "Styles/Reset.scss";

const ROOT = document.getElementById("root");
if (!ROOT) {
  throw new Error("Error mounting app");
}
createRoot(ROOT).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(registration => {
          console.log("SW registered: ", registration);
        })
        .catch(registrationError => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
}
