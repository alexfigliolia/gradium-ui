import type { HTMLProps } from "react";
import { memo, useState } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useController } from "@figliolia/react-hooks";
import { Controller } from "./Controller";
import type { State } from "./types";
import "./styles.scss";

export const BorderTile = memo(function BorderTile({
  className,
  children,
  ...rest
}: HTMLProps<HTMLDivElement>) {
  const [frame, setFrame] = useState<State>({
    x: 0,
    y: 0,
    opacity: 0,
  });
  const classes = useClassNames("border-tile", className);
  const controller = useController(new Controller(setFrame));
  return (
    <div className={classes} {...rest} {...controller.bindings}>
      <div>{children}</div>
      <div
        className="border"
        style={{
          "--x": `${frame.x}px`,
          "--y": `${frame.y}px`,
          opacity: frame.opacity,
        }}
      />
    </div>
  );
});
