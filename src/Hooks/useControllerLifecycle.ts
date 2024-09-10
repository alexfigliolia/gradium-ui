import { useEffect } from "react";
import { useController } from "@figliolia/react-hooks";
import type { LifeCycleController } from "Types/Generics";

export const useControllerLifecycle = <T extends LifeCycleController>(
  ctrl: T,
) => {
  const controller = useController(ctrl);
  useEffect(() => {
    controller.initialize();
    return () => {
      controller.destroy();
    };
  });
  return controller;
};
