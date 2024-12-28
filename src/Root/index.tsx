import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { getClient } from "GraphQL/getClient";
import { App } from "./App";
import "Styles/Reset.scss";

const ROOT = document.getElementById("root");
if (!ROOT) {
  throw new Error("Error mounting app");
}
createRoot(ROOT).render(
  <StrictMode>
    <QueryClientProvider client={getClient()}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
