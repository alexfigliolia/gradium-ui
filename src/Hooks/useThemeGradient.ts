import { useLayoutEffect, useState } from "react";
import type { IThemeName } from "@figliolia/galena-dark-mode";
import { Theme } from "State/Theme";
import CSSVars from "Styles/Exports.module.scss";

const DARK_GRADIENT: [string, string] = [CSSVars.yellow, CSSVars.orange];
const LIGHT_GRADIENT: [string, string] = [CSSVars.teal, CSSVars.blue];

const getGradient = (theme: IThemeName) =>
  theme === "dark" ? DARK_GRADIENT : LIGHT_GRADIENT;

export const useThemeGradient = () => {
  const [gradient, setGradient] = useState<[string, string]>(
    getGradient(Theme.getState().theme),
  );
  useLayoutEffect(() => {
    const ID = Theme.subscribe(state => {
      setGradient(getGradient(state.theme));
    });
    return () => {
      Theme.unsubscribe(ID);
    };
  }, []);
  return gradient;
};
