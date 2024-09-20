import type { ForwardedRef, MouseEvent } from "react";
import { forwardRef, memo } from "react";
import { Link } from "react-router-dom";
import type { Callback } from "Types/Generics";
import type { OptionalRef } from "Types/React";
import { Routing } from "../Routing";
import { ScrollLink } from "../ScrollLink";
import "./styles.scss";

export const Nav = memo(
  forwardRef(function Nav(
    { onNavigate }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    return (
      <nav ref={ref} className="marketing-nav">
        {Routing.SECTION_IDS.map(ID => {
          return (
            <ScrollLink key={ID} id={ID} onNavigate={onNavigate}>
              {ID}
            </ScrollLink>
          );
        })}
        <Link to="/register/login" onClick={onNavigate}>
          Login
        </Link>
      </nav>
    );
  }),
);

interface Props extends OptionalRef<HTMLDivElement> {
  onNavigate?: Callback<[MouseEvent<HTMLAnchorElement>]>;
}
