import type { MouseEvent } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientButton } from "Components/GradientButton";
import { TriangleLoader } from "Components/TriangleLoader";
import { Check } from "Icons/Check";
import { Error } from "Icons/Error";
import type { ActionState, OptionalChildren } from "Types/React";
import "./styles.scss";

export const ActionButton = memo(function ActionButton({
  type,
  onClick,
  disabled,
  children,
  className,
  tabIndex,
  ...rest
}: Props) {
  const classes = useClassNames("action-button", className, rest);
  return (
    <GradientButton
      type={type}
      onClick={onClick}
      className={classes}
      tabIndex={tabIndex}
      disabled={rest.loading || disabled}>
      <div>{children}</div>
      <TriangleLoader />
      <Check />
      <Error />
    </GradientButton>
  );
});

interface Props extends OptionalChildren, ActionState {
  className?: string;
  tabIndex?: number;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
