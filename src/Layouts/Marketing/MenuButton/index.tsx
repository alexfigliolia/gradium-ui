import { memo, useCallback } from "react";
import { Burger } from "Components/Burger";
import { Marketing, mobileMenu, useMarketing } from "State/Marketing";
import type { Propless } from "Types/React";

export const MenuButton = memo(
  function MenuButton(_: Propless) {
    const open = useMarketing(mobileMenu);
    const onClick = useCallback(() => {
      if (open) {
        return Marketing.mobileMenu.close();
      }
      Marketing.mobileMenu.open();
    }, [open]);

    return <Burger open={open} aria-label="Toggle Menu" onClick={onClick} />;
  },
  () => true,
);
