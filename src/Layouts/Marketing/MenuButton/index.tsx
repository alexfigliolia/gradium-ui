import { memo, useCallback } from "react";
import { Burger } from "Components/Burger";
import { mobileMenu, Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";

export const MenuButton = memo(
  function MenuButton(_: Propless) {
    const open = useModals(mobileMenu);
    const onClick = useCallback(() => {
      if (open) {
        return Modals.mobileMenu.close();
      }
      Modals.mobileMenu.open();
    }, [open]);

    return <Burger open={open} aria-label="Toggle Menu" onClick={onClick} />;
  },
  () => true,
);
