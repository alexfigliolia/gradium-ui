import { memo } from "react";
import { RouterProvider } from "react-router-dom";
import { useSetup as useSetupTheme } from "@figliolia/galena-dark-mode";
import { useSetup as useSetupWindow } from "@figliolia/galena-window";
import { Router } from "Router";
import { Screen } from "State/Screen";
import { Theme } from "State/Theme";
import type { Propless } from "Types/React";

export const App = memo(
  function App(_: Propless) {
    useSetupTheme(Theme);
    useSetupWindow(Screen);
    return <RouterProvider router={Router} />;
  },
  () => true,
);
