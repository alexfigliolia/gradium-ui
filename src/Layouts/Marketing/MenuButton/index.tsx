import { memo, useCallback } from "react";
import { Burger } from "Components/Burger";
import { marketingMobileMenu, Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";

export const MenuButton = memo(
  function MenuButton(_: Propless) {
    const open = useModals(marketingMobileMenu);
    const onClick = useCallback(() => {
      if (open) {
        return Modals.marketingMobileMenu.close();
      }
      Modals.marketingMobileMenu.open();
    }, [open]);

    return <Burger open={open} aria-label="Toggle Menu" onClick={onClick} />;
  },
  () => true,
);
