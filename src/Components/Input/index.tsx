import type { ForwardedRef, InputHTMLAttributes, ReactNode } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const Input = memo(
  forwardRef(function Input(
    { icon, label, children, className, placeholder, ...rest }: InputProps,
    ref: ForwardedRef<InputRef>,
  ) {
    const input = useRef<HTMLInputElement>(null);
    const labelNode = useRef<HTMLLabelElement>(null);
    const focus = useCallback(() => {
      input.current?.focus?.();
    }, []);
    const classes = useClassNames("input", className);

    useImperativeHandle(
      ref,
      () => ({
        input: input.current,
        label: labelNode.current,
      }),
      [input],
    );
    return (
      <label className={classes} ref={labelNode}>
        <span>{label}</span>
        <div className="input-positioner">
          {icon && (
            <button
              type="button"
              onClick={focus}
              tabIndex={-1}
              disabled={rest.disabled || rest.readOnly}>
              {icon}
              {icon}
            </button>
          )}
          <input {...rest} ref={input} placeholder={placeholder || " "} />
        </div>
        {children}
      </label>
    );
  }),
);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

export interface InputRef {
  label: HTMLLabelElement | null;
  input: HTMLInputElement | null;
}
