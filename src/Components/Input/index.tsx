import type {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
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

function InputComponent<T extends InputType>(
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
  }: InputProps<T>,
  ref: ForwardedRef<InputRef<T>>,
) {
  type Input = T extends "textarea" ? HTMLTextAreaElement : HTMLInputElement;
  const [valid, setValid] = useState(false);
  const [focused, setFocused] = useState(false);
  const [autofilled, setAutofilled] = useState(false);

  const input = useRef<Input>(null);
  const labelNode = useRef<HTMLLabelElement>(null);

  const onIconClick = useCallback(() => {
    if (onClickIcon) {
      return onClickIcon();
    }
    input.current?.focus?.();
  }, [onClickIcon]);

  const triggerValidityCheck = useCallback(() => {
    setValid(!!input.current?.validity?.valid && !!input.current?.value);
    setAutofilled(!!input.current?.matches?.(":autofill"));
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      input: input.current,
      label: labelNode.current,
      clear: () => {
        if (input.current) {
          input.current.value = "";
          input.current.dispatchEvent(new Event("change", { bubbles: true }));
          triggerValidityCheck();
        }
      },
    }),
    [input, triggerValidityCheck],
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
      setTimeout(triggerValidityCheck, 100);
    } catch (error) {
      // browser support
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    triggerValidityCheck();
  }, [value, triggerValidityCheck]);

  const Component = useMemo(
    () => (type === "textarea" ? "textarea" : "input"),
    [type],
  );

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
        <Component
          {...rest}
          type={type}
          // @ts-ignore
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
}

export const Input = memo(forwardRef(InputComponent)) as typeof InputComponent;

export type Props<T extends InputType> = {
  label: string;
  icon?: T extends "textarea" ? undefined : ReactNode;
  type: T;
  ref?: ForwardedRef<InputRef<T>>;
  onClickIcon?: Callback;
};

export type InputProps<T extends InputType> = Omit<
  T extends "textarea"
    ? TextareaHTMLAttributes<HTMLTextAreaElement>
    : Omit<InputHTMLAttributes<HTMLInputElement>, "type">,
  keyof Props<T>
> &
  Props<T>;

export interface InputRef<T extends InputType> {
  clear: () => void;
  label: HTMLLabelElement | null;
  input: (T extends "textarea" ? HTMLTextAreaElement : HTMLInputElement) | null;
}

type InputType = InputHTMLAttributes<HTMLInputElement>["type"] | "textarea";
