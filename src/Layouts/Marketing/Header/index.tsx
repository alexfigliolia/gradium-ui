import { memo } from "react";
import { Header as CoreHeader } from "Components/Header";
import type { Propless } from "Types/React";
import { Logo } from "../Logo";
import { MenuButton } from "../MenuButton";
import { Nav } from "../Nav";
import "./styles.scss";

export const Header = memo(
  function Header(_: Propless) {
    return (
      <CoreHeader className="marketing-header">
        <Logo />
        <MenuButton />
        <Nav />
      </CoreHeader>
    );
  },
  () => true,
);
