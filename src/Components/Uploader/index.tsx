import type { CSSProperties, ForwardedRef, InputHTMLAttributes } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import { useFocusedKeyListener } from "@figliolia/react-hooks";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const Uploader = memo(
  forwardRef(function Uploader(
    { style, children, className, ...rest }: Props,
    reset: ForwardedRef<Callback>,
  ) {
    const input = useRef<HTMLInputElement>(null);
    const classes = useClassNames("file-uploader", className);
    const controller = useFocusedKeyListener(() => {
      input.current?.focus?.();
    });
    const clear = useCallback(() => {
      if (input.current) {
        input.current.value = "";
      }
    }, []);
    useImperativeHandle(reset, () => clear);
    return (
      <label className={classes} style={style} {...controller.events}>
        {children}
        <input ref={input} type="file" {...rest} />
      </label>
    );
  }),
);

interface Props
  extends InputHTMLAttributes<HTMLInputElement>,
    OptionalChildren {
  style?: CSSProperties;
  className?: string;
}
