import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { TriangleLoader } from "Components/TriangleLoader";
import { Check } from "Icons/Check";
import { Error } from "Icons/Error";
import type { ActionState } from "Types/React";
import "Components/ActionButton/styles.scss";

export const LoadingState = memo(function LoadingState({
  className,
  loading,
  error,
  success,
  ...rest
}: ILoadingState) {
  const classes = useClassNames("loading-action", className, {
    loading: !!loading,
    success: !!success,
    error: !!error,
  });
  return (
    <div className={classes} {...rest}>
      <TriangleLoader />
      <Check />
      <Error />
    </div>
  );
});

export interface ILoadingState extends ActionState {
  className?: string;
}
