import { memo, useLayoutEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useClassNames } from "@figliolia/classnames";
import { useController } from "@figliolia/react-hooks";
import { GradientBorderLink } from "Components/GradientBorderButton";
import { RightArrow } from "Icons/RightArrow";
import { AdminRoutes } from "Router/AdminRoutes";
import { currentProperty, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { Controller } from "./Controller";
import "./styles.scss";

export const ConfigureLink = memo(
  function ConfigureLink(_: Propless) {
    const { pathname } = useLocation();
    const { slug } = useProperties(currentProperty);
    const [route, setRoute] = useState("");
    const [width, setWidth] = useState<string | undefined>(undefined);
    const controller = useController(new Controller(setWidth));

    const nestedRoute = useMemo(
      () => controller.activeSubRoute(pathname),
      [pathname, controller],
    );

    useLayoutEffect(() => {
      if (nestedRoute) {
        setRoute(nestedRoute);
      }
    }, [nestedRoute]);

    useLayoutEffect(() => {
      controller.resize();
    }, [controller, route]);

    const link = useMemo(
      () => AdminRoutes.slugRoute(slug, "configure"),
      [slug],
    );

    const classes = useClassNames("sublink", { active: !!nestedRoute });

    return (
      <GradientBorderLink to={link} className="configure-link">
        configure
        <div className={classes} style={{ "--width": width }}>
          <RightArrow aria-hidden />
          <div ref={controller.register}>{route}</div>
        </div>
      </GradientBorderLink>
    );
  },
  () => true,
);
