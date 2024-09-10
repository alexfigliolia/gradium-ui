import { memo } from "react";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const PickerScreen = memo(function PickerScreen({
  children,
}: OptionalChildren) {
  return <div className="date-picker-screen">{children}</div>;
});
