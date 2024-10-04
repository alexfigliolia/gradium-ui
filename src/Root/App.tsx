import { Fragment, memo } from "react";
import { RouterProvider } from "react-router-dom";
import { useSetup as useSetupTheme } from "@figliolia/galena-dark-mode";
import { useSetup as useSetupWindow } from "@figliolia/galena-window";
import { LazyToaster } from "Components/Toaster/Lazy";
import { useControllerLifecycle } from "Hooks/useControllerLifecycle";
import { Router } from "Router";
import { Screen } from "State/Screen";
import { Theme } from "State/Theme";
import { Toasts } from "State/Toasts";
import { LanguageHandler } from "Tools/LanguageHandler";
import type { Propless } from "Types/React";
import { SVGGradients } from "./SVGGradients";

export const App = memo(
  function App(_: Propless) {
    useSetupTheme(Theme);
    useSetupWindow(Screen);
    useControllerLifecycle(Toasts);
    useControllerLifecycle(LanguageHandler);
    return (
      <Fragment>
        <SVGGradients />
        <RouterProvider router={Router} />
        <LazyToaster />
      </Fragment>
    );
  },
  () => true,
);
