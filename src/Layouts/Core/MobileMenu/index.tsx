import { memo } from "react";
import { MobileMenu as CoreMobileMenu } from "Components/MobileMenu";
import { ManagementLinks } from "Layouts/Management/ManagementLinks";
import { coreMobileMenu, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import "./styles.scss";

export const MobileMenu = memo(
  function MobileMenu(_: Propless) {
    const open = useScope(coreMobileMenu);
    return (
      <CoreMobileMenu open={open} className="core-mobile-menu">
        <ManagementLinks />
      </CoreMobileMenu>
    );
  },
  () => true,
);
