import { memo, useCallback } from "react";
import { useClassNames } from "@figliolia/classnames";
import type { Callback } from "Types/Generics";

export const Button = memo(function Button({ name, onClick, active }: Props) {
  const select = useCallback(() => {
    onClick(name);
  }, [onClick, name]);

  const classes = useClassNames({ active });

  return (
    <button className={classes} onClick={select}>
      {name}
    </button>
  );
});

interface Props {
  name: TabKey;
  active: boolean;
  onClick: Callback<[TabKey]>;
}

export type TabKey = "staff" | "invites";
