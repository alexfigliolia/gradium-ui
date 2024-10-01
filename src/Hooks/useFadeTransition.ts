import type { RefObject } from "react";
import { useCallback, useImperativeHandle, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import CSSVars from "Styles/Exports.module.scss";
import type { Callback } from "Types/Generics";

export const useFadeTransition = (
  ref: RefObject<Callback<[Callback]> | undefined>,
  ...classNames: (string | undefined)[]
) => {
  const [fade, setFade] = useState(false);
  const classes = useClassNames(...classNames, { fade });
  const fadeOut = useCallback((callback: Callback) => {
    setFade(true);
    setTimeout(
      () => {
        callback();
      },
      parseInt(CSSVars.fadeDuration.slice(0, -2)),
    );
  }, []);
  useImperativeHandle(ref, () => fadeOut, [fadeOut]);
  return classes;
};
