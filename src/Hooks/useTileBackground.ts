import { useLayoutEffect, useState } from "react";
import type { ITheme } from "@figliolia/galena-dark-mode";
import { Theme } from "State/Theme";
import CSSVars from "Styles/Exports.module.scss";

const tileBG = ({ theme }: ITheme) =>
  theme === "dark" ? CSSVars.tileBackgroundDark : CSSVars.tileBackgroundLight;

export const useTileBackground = () => {
  const [color, setColor] = useState(tileBG(Theme.getState()));
  useLayoutEffect(() => {
    const ID = Theme.subscribe(state => {
      setColor(tileBG(state));
    });
    return () => {
      Theme.unsubscribe(ID);
    };
  }, []);
  return color;
};
