import { memo } from "react";
import { Link } from "react-router-dom";
import { IconLink } from "Components/IconLink";
import { ThemeToggle } from "Components/ThemeToggle";
import { Logo } from "Layouts/Marketing/Logo";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import "./styles.scss";

export const NavBar = memo(
  function NavBar(_: Propless) {
    return (
      <header className="core-nav">
        <nav>
          <Link to="/" className="logo-link">
            <Logo />
          </Link>
          {AdminRoutes.navigationRoutes.map(route => {
            return <IconLink key={route.path} {...route} />;
          })}
        </nav>
        <ThemeToggle />
      </header>
    );
  },
  () => true,
);
