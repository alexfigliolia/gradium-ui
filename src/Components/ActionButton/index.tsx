import type { MouseEvent } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientButton } from "Components/GradientButton";
import { TriangeLoader } from "Components/TriangleLoader";
import { Check } from "Icons/Check";
import { Error } from "Icons/Error";
import type { ActionState, OptionalChildren } from "Types/React";
import "./styles.scss";

export const ActionButton = memo(function ActionButton({
  type,
  onClick,
  children,
  className,
  ...rest
}: Props) {
  const classes = useClassNames("action-button", className, rest);
  return (
    <GradientButton
      type={type}
      onClick={onClick}
      className={classes}
      disabled={rest.loading}>
      <div>{children}</div>
      <TriangeLoader />
      <Check />
      <Error />
    </GradientButton>
  );
});

interface Props extends OptionalChildren, ActionState {
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
