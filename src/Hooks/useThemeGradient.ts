import { useLayoutEffect, useState } from "react";
import { Theme } from "State/Theme";
import CSSVars from "Styles/Exports.module.scss";

const DARK_GRADIENT: [string, string] = [CSSVars.yellow, CSSVars.orange];
const LIGHT_GRADIENT: [string, string] = [CSSVars.teal, CSSVars.blue];

export const useThemeGradient = () => {
  const [gradient, setGradient] = useState<[string, string]>(
    Theme.getState().theme === "dark" ? DARK_GRADIENT : LIGHT_GRADIENT,
  );
  useLayoutEffect(() => {
    const ID = Theme.subscribe(state => {
      if (state.theme === "dark") {
        setGradient(DARK_GRADIENT);
      } else {
        setGradient(LIGHT_GRADIENT);
      }
    });
    return () => {
      Theme.unsubscribe(ID);
    };
  }, []);
  return gradient;
};
