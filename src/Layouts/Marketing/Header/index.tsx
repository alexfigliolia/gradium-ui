import { memo } from "react";
import type { Propless } from "Types/React";
import { Logo } from "../Logo";
import { MenuButton } from "../MenuButton";
import { Nav } from "../Nav";
import "./styles.scss";

export const Header = memo(
  function Header(_: Propless) {
    return (
      <header className="public-header">
        <div>
          <Logo />
          <MenuButton />
          <Nav />
        </div>
      </header>
    );
  },
  () => true,
);
