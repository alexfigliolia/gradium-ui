import type { InputHTMLAttributes, ReactNode } from "react";
import { memo, useCallback, useRef } from "react";
import "./styles.scss";

export const Input = memo(function Input({
  label,
  placeholder,
  icon,
  ...rest
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const focus = useCallback(() => {
    input.current?.focus?.();
  }, []);
  return (
    <label className="input">
      <span>{label}</span>
      <div>
        {icon && (
          <button type="button" onClick={focus} tabIndex={-1}>
            {icon}
            {icon}
          </button>
        )}
        <input {...rest} ref={input} placeholder={placeholder || " "} />
      </div>
    </label>
  );
});

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}
