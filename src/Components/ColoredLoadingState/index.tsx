import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { type ILoadingState, LoadingState } from "Components/LoadingState";
import "Components/ColoredActionButton/styles.scss";

export const ColoredLoadingState = memo(function ColoredLoadingState({
  className,
  ...rest
}: ILoadingState) {
  const classes = useClassNames("colored-loading-action", className);
  return <LoadingState {...rest} className={classes} />;
});
