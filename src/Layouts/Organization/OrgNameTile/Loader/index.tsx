import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { TriangeLoader } from "Components/TriangleLoader";
import { Check } from "Icons/Check";
import { Error } from "Icons/Error";
import type { ActionState } from "Types/React";
import "Components/ActionButton/styles.scss";
import "./styles.scss";

export const Loader = memo(function Loader({
  loading,
  error,
  success,
}: Required<ActionState>) {
  const classes = useClassNames("inline-loader", "action-button", {
    loading,
    error,
    success,
  });
  return (
    <div className={classes}>
      <TriangeLoader />
      <Check />
      <Error />
    </div>
  );
});
