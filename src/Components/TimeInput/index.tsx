import { memo } from "react";
import type { InputProps } from "Components/Input";
import { Input } from "Components/Input";
import "./styles.scss";

export const TimeInput = memo(function TimeInput(
  props: Omit<InputProps, "type">,
) {
  return <Input {...props} type="time" />;
});
