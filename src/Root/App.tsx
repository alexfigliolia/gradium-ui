import { memo, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "Router";
import { Screen } from "State/Screen";
import { Theme } from "State/Theme";
import type { Propless } from "Types/React";

export const App = memo(
  function App(_: Propless) {
    useEffect(() => {
      Theme.initialize();
      Screen.initialize();
      return () => {
        Theme.destroy;
        Screen.destroy();
      };
    }, []);

    return <RouterProvider router={Router} />;
  },
  () => true,
);
