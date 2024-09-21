import { memo } from "react";
import { useClassNames } from "@figliolia/classnames";
import { IconLink } from "Components/IconLink";
import { AdminRoutes } from "Router/AdminRoutes";
import { coreMobileMenu, useModals } from "State/Modals";
import type { Propless } from "Types/React";

export const MobileMenu = memo(
  function MobileMenu(_: Propless) {
    const open = useModals(coreMobileMenu);
    const classes = useClassNames("core-mobile-menu", { open });
    return (
      <menu className={classes}>
        <nav>
          {AdminRoutes.navigationRoutes.map(route => {
            return <IconLink key={route.path} {...route} />;
          })}
        </nav>
      </menu>
    );
  },
  () => true,
);
