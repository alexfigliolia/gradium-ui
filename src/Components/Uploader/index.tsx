import type { CSSProperties, InputHTMLAttributes } from "react";
import { memo, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { useFocusedKeyListener } from "@figliolia/react-hooks";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

export const Uploader = memo(function Uploader({
  style,
  children,
  className,
  ...rest
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const classes = useClassNames("file-uploader", className);
  const controller = useFocusedKeyListener(() => {
    input.current?.focus();
  });
  return (
    <label className={classes} style={style} {...controller.events}>
      {children}
      <input ref={input} type="file" {...rest} />
    </label>
  );
});

interface Props
  extends InputHTMLAttributes<HTMLInputElement>,
    OptionalChildren {
  style?: CSSProperties;
  className?: string;
}
