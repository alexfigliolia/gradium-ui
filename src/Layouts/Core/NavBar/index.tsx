import { memo } from "react";
import { Link } from "react-router-dom";
import { Header } from "Components/Header";
import { Logo } from "Components/Logo";
import { ThemeToggle } from "Components/ThemeToggle";
import type { Propless } from "Types/React";
import { AdminNav } from "../AdminNav";
import { MenuButton } from "./MenuButton";
import "./styles.scss";

export const NavBar = memo(
  function NavBar(_: Propless) {
    return (
      <Header className="core-nav">
        <nav>
          <Link to="/" className="logo-link">
            <Logo />
          </Link>
          <div>
            <AdminNav />
          </div>
        </nav>
        <MenuButton />
        <ThemeToggle />
      </Header>
    );
  },
  () => true,
);
