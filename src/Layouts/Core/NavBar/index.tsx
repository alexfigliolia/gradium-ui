import { memo } from "react";
import { Link } from "react-router-dom";
import { IconLink } from "Components/IconLink";
import { Logo } from "Components/Logo";
import { ThemeToggle } from "Components/ThemeToggle";
import { AdminRoutes } from "Router/AdminRoutes";
import type { Propless } from "Types/React";
import { MenuButton } from "./MenuButton";
import "./styles.scss";

export const NavBar = memo(
  function NavBar(_: Propless) {
    return (
      <header className="core-nav">
        <nav>
          <Link to="/" className="logo-link">
            <Logo />
          </Link>
          <div>
            {AdminRoutes.navigationRoutes.map(route => {
              return <IconLink key={route.path} {...route} />;
            })}
          </div>
          <MenuButton />
        </nav>
        <ThemeToggle />
      </header>
    );
  },
  () => true,
);
