import { Fragment, memo } from "react";
import { RouterProvider } from "react-router-dom";
import { useSetup as useSetupTheme } from "@figliolia/galena-dark-mode";
import { useSetup as useSetupWindow } from "@figliolia/galena-window";
import { BrandSVGGradient } from "Components/BrandSVGGradient";
import { Router } from "Router";
import { Screen } from "State/Screen";
import { Theme } from "State/Theme";
import type { Propless } from "Types/React";
import "./styles.scss";

export const App = memo(
  function App(_: Propless) {
    useSetupTheme(Theme);
    useSetupWindow(Screen);
    return (
      <Fragment>
        <svg className="gradient-hidden">
          <BrandSVGGradient id="globalBrandGradient" />
        </svg>
        <RouterProvider router={Router} />;
      </Fragment>
    );
  },
  () => true,
);
