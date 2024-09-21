import { memo } from "react";
import { MobileMenu as CoreMobileMenu } from "Components/MobileMenu";
import { coreMobileMenu, useModals } from "State/Modals";
import type { Propless } from "Types/React";
import { AdminNav } from "../AdminNav";
import "./styles.scss";

export const MobileMenu = memo(
  function MobileMenu(_: Propless) {
    const open = useModals(coreMobileMenu);
    return (
      <CoreMobileMenu open={open} className="core-mobile-menu">
        <nav>
          <AdminNav />
        </nav>
      </CoreMobileMenu>
    );
  },
  () => true,
);
