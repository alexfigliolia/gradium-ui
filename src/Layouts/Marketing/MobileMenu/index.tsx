import { memo, useCallback } from "react";
import { MobileMenu as CoreMobileMenu } from "Components/MobileMenu";
import { marketingMobileMenu, Modals, useModals } from "State/Modals";
import type { Propless } from "Types/React";
import { Nav } from "../Nav";
import "./styles.scss";

export const MobileMenu = memo(function MobileMenu(_: Propless) {
  const open = useModals(marketingMobileMenu);

  const onNavigate = useCallback(() => {
    Modals.marketingMobileMenu.close();
  }, []);

  return (
    <CoreMobileMenu open={open} className="marketing-menu">
      <Nav onNavigate={onNavigate} />
    </CoreMobileMenu>
  );
});
