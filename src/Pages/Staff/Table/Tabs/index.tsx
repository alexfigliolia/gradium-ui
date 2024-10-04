import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "Types/Generics";
import { Button, type TabKey } from "./Button";
import "./styles.scss";

export const Tabs = memo(function Tabs({ onChange, active }: Props) {
  const classes = useClassNames("slide", active);
  return (
    <div className="staff-list-tabs">
      <Button name="staff" onClick={onChange} active={active === "staff"} />
      <Button name="invites" onClick={onChange} active={active === "invites"} />
      <div className={classes} />
    </div>
  );
});

interface Props {
  active: TabKey;
  onChange: Callback<[TabKey]>;
}
