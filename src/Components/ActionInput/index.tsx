import type { FormEvent } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { ActionButton } from "Components/ActionButton";
import type { InputProps } from "Components/Input";
import { Input } from "Components/Input";
import type { Callback } from "Types/Generics";
import type { ActionState } from "Types/React";
import "./styles.scss";

export const ActionInput = memo(function ActionInput({
  onSubmit,
  error,
  success,
  loading,
  className,
  buttonText,
  ...inputProps
}: Props) {
  const classes = useClassNames("action-input", className);
  return (
    <form onSubmit={onSubmit} className={classes}>
      <Input {...inputProps} />
      <ActionButton error={!!error} success={success} loading={loading}>
        {buttonText}
      </ActionButton>
    </form>
  );
});

interface Props extends Omit<InputProps, "onSubmit">, ActionState {
  className?: string;
  buttonText: string;
  onSubmit: Callback<[FormEvent<HTMLFormElement>]>;
}
