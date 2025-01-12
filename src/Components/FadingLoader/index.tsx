import type { ForwardedRef } from "react";
import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { TriangleLoader } from "Components/TriangleLoader";
import type { Callback } from "Types/Generics";
import "./styles.scss";

export const FadingLoader = memo(
  forwardRef(function FadingLoader(
    { initialState = false }: Props,
    ref: ForwardedRef<Callback<[boolean]>>,
  ) {
    const [hide, setFade] = useState(initialState);
    useImperativeHandle(ref, () => setFade);
    const classes = useClassNames("fading-loader", "reveal", { hide });
    return (
      <div className={classes} aria-hidden={hide}>
        <TriangleLoader />
      </div>
    );
  }),
);

interface Props {
  initialState?: boolean;
}
