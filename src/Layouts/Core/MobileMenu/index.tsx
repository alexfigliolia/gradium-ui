import { memo } from "react";
import { MobileMenu as CoreMobileMenu } from "Components/MobileMenu";
import { ManagementLinks } from "Layouts/Management/ManagementLinks";
import { coreMobileMenu, useModals } from "State/Modals";
import type { Propless } from "Types/React";
import "./styles.scss";

export const MobileMenu = memo(
  function MobileMenu(_: Propless) {
    const open = useModals(coreMobileMenu);
    return (
      <CoreMobileMenu open={open} className="core-mobile-menu">
        <ManagementLinks />
      </CoreMobileMenu>
    );
  },
  () => true,
);
