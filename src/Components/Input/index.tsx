import type { ForwardedRef, InputHTMLAttributes, ReactNode } from "react";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "Types/Generics";
import { Controller } from "./Controller";
import "./styles.scss";

export const Input = memo(
  forwardRef(function Input(
    {
      icon,
      type,
      label,
      value,
      onBlur,
      onFocus,
      onChange,
      children,
      className,
      placeholder,
      onClickIcon,
      readOnly = false,
      disabled = false,
      ...rest
    }: InputProps,
    ref: ForwardedRef<InputRef>,
  ) {
    const [valid, setValid] = useState(false);
    const [focused, setFocused] = useState(false);
    const [autofilled, setAutofilled] = useState(false);

    const input = useRef<HTMLInputElement>(null);
    const labelNode = useRef<HTMLLabelElement>(null);

    const onIconClick = useCallback(() => {
      if (onClickIcon) {
        return onClickIcon();
      }
      input.current?.focus?.();
    }, [onClickIcon]);

    useImperativeHandle(
      ref,
      () => ({
        input: input.current,
        label: labelNode.current,
      }),
      [input],
    );

    const focusInterceptor = useMemo(
      () => Controller.createInterceptor(onFocus)(setFocused, [true]),
      [onFocus],
    );

    const blurInterceptor = useMemo(
      () => Controller.createInterceptor(onBlur)(setFocused, [false]),
      [onBlur],
    );

    const changeInterceptor = useMemo(
      () =>
        Controller.createInterceptor(onChange)(
          (state: boolean) => {
            setValid(state);
            setAutofilled(state);
          },
          e => [e.target.validity.valid && !!e.target.value] as const,
        ),
      [onChange],
    );

    const classes = useClassNames("input", type, className, {
      valid,
      focused,
      disabled,
      readOnly,
      autofilled,
      hasIcon: !!icon,
    });

    useEffect(() => {
      try {
        setTimeout(() => {
          setValid(!!input.current?.validity?.valid && !!input.current?.value);
          setAutofilled(!!input.current?.matches?.(":autofill"));
        }, 100);
      } catch (error) {
        // browser support
      }
    }, []);

    useEffect(() => {
      setValid(!!input.current?.validity?.valid && !!input.current?.value);
    }, [value]);

    return (
      <label className={classes} ref={labelNode}>
        <span>{label}</span>
        <div className="input-positioner">
          {icon && (
            <button
              type="button"
              tabIndex={-1}
              onClick={onIconClick}
              disabled={disabled || readOnly}>
              {icon}
              {icon}
            </button>
          )}
          <input
            {...rest}
            type={type}
            ref={input}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            onBlur={blurInterceptor}
            onFocus={focusInterceptor}
            onChange={changeInterceptor}
            placeholder={placeholder || " "}
          />
        </div>
        {children}
      </label>
    );
  }),
);

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  onClickIcon?: Callback;
}

export interface InputRef {
  label: HTMLLabelElement | null;
  input: HTMLInputElement | null;
}
