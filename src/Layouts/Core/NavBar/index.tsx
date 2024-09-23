import { memo } from "react";
import { Link } from "react-router-dom";
import { Header } from "Components/Header";
import { ThemeLogo } from "Components/ThemeLogo";
import { ThemeToggle } from "Components/ThemeToggle";
import { ManagementLinks } from "Layouts/Management/ManagementLinks";
import type { Propless } from "Types/React";
import { MenuButton } from "./MenuButton";
import "./styles.scss";

export const NavBar = memo(
  function NavBar(_: Propless) {
    return (
      <Header className="core-nav">
        <nav>
          <Link to="/" className="logo-link">
            <ThemeLogo />
          </Link>
          <div>
            <ManagementLinks />
          </div>
        </nav>
        <MenuButton />
        <ThemeToggle />
      </Header>
    );
  },
  () => true,
);
