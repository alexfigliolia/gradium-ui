import { memo, useCallback } from "react";
import { MobileMenu as CoreMobileMenu } from "Components/MobileMenu";
import { Marketing, mobileMenu, useMarketing } from "State/Marketing";
import type { Propless } from "Types/React";
import { Nav } from "../Nav";
import "./styles.scss";

export const MobileMenu = memo(
  function MobileMenu(_: Propless) {
    const open = useMarketing(mobileMenu);

    const onNavigate = useCallback(() => {
      Marketing.mobileMenu.close();
    }, []);

    return (
      <CoreMobileMenu open={open} className="marketing-menu">
        <Nav onNavigate={onNavigate} />
      </CoreMobileMenu>
    );
  },
  () => true,
);
