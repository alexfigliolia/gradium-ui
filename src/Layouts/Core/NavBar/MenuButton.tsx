import { memo } from "react";
import { Burger } from "Components/Burger";
import { coreMobileMenu, Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";

export const MenuButton = memo(
  function MenuButton(_: Propless) {
    const open = useModals(coreMobileMenu);
    const onClick = () => {
      if (open) {
        return Modals.coreMobileMenu.close();
      }
      Modals.coreMobileMenu.open();
    };
    return <Burger open={open} className="core-burger" onClick={onClick} />;
  },
  () => true,
);
