import { memo } from "react";
import type { Propless } from "Types/React";
import { Logo } from "../Logo";
import "./styles.scss";

export const Footer = memo(
  function Footer(_: Propless) {
    return (
      <footer className="marketing-footer">
        <Logo />
      </footer>
    );
  },
  () => true,
);
