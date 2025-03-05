import type { ButtonHTMLAttributes } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientButton } from "Components/GradientButton";
import { TriangleLoader } from "Components/TriangleLoader";
import { Check } from "Icons/Check";
import { Error } from "Icons/Error";
import type { ActionState } from "Types/React";
import "./styles.scss";

export const ActionButton = memo(function ActionButton({
  disabled,
  children,
  className,
  loading,
  error,
  success,
  ...rest
}: ActionButtonProps) {
  const classes = useClassNames("loading-action", className, {
    loading: !!loading,
    success: !!success,
    error: !!error,
  });
  return (
    <GradientButton
      className={classes}
      disabled={loading || disabled}
      {...rest}>
      <div>{children}</div>
      <TriangleLoader />
      <Check aria-hidden />
      <Error aria-hidden />
    </GradientButton>
  );
});

export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ActionState {}
