import type { MouseEvent } from "react";
import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { GradientButton } from "Components/GradientButton";
import { TriangeLoader } from "Components/TriangleLoader";
import { Check } from "Icons/Check";
import { Error } from "Icons/Error";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const ActionButton = memo(function ActionButton({
  type,
  onClick,
  children,
  ...rest
}: Props) {
  const classes = useClassNames("action-button", rest);
  return (
    <GradientButton type={type} className={classes} onClick={onClick}>
      {children}
      <TriangeLoader />
      <Check />
      <Error />
    </GradientButton>
  );
});

interface Props extends OptionalChildren {
  error?: boolean;
  loading?: boolean;
  success?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
