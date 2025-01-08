import { memo } from "react";
import { Burger } from "Components/Burger";
import { coreMobileMenu, Scope, useScope } from "State/Scope";
import type { Propless } from "Types/React";

export const MenuButton = memo(
  function MenuButton(_: Propless) {
    const open = useScope(coreMobileMenu);
    const onClick = () => {
      if (open) {
        return Scope.coreMobileMenu.close();
      }
      Scope.coreMobileMenu.open();
    };
    return <Burger open={open} className="core-burger" onClick={onClick} />;
  },
  () => true,
);
