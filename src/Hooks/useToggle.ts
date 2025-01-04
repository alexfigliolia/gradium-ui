import { useCallback, useState } from "react";
import type { ModalToggle } from "@figliolia/modal-stack";
import { useController } from "@figliolia/react-hooks";
import { ModalStack } from "Tools/ModalStack";

export const useToggle = (): [boolean, ModalToggle] => {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const controller = useController(ModalStack.create(open, close));
  return [isOpen, controller];
};
