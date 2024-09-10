import type { ForwardedRef, InputHTMLAttributes, ReactNode } from "react";
import { forwardRef, memo, useCallback, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import "./styles.scss";

export const Input = memo(
  forwardRef(function Input(
    { icon, label, children, className, placeholder, ...rest }: InputProps,
    ref: ForwardedRef<HTMLLabelElement>,
  ) {
    const input = useRef<HTMLInputElement>(null);
    const focus = useCallback(() => {
      input.current?.focus?.();
    }, []);
    const classes = useClassNames("input", className);
    return (
      <label className={classes} ref={ref}>
        <span>{label}</span>
        <div className="input-positioner">
          {icon && (
            <button type="button" onClick={focus} tabIndex={-1}>
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
