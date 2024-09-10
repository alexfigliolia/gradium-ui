import { useEffect, useMemo } from "react";
import { useController } from "@figliolia/react-hooks";
import { FocusedKeyListener } from "Tools/FocusedKeyListener";
import type { Callback } from "Types/Generics";

export const useFocusedKeyListener = (onEnter: Callback, ...keys: string[]) => {
  const activators = useMemo(() => (keys.length ? keys : ["Enter"]), [keys]);
  const controller = useController(
    new FocusedKeyListener(onEnter, ...activators),
  );
  useEffect(() => {
    controller.update(onEnter, ...activators);
  }, [activators, onEnter, controller]);
  return controller;
};
