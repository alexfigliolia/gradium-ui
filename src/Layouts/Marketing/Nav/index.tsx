import type { ForwardedRef, MouseEvent } from "react";
import { forwardRef, memo } from "react";
import { IconThemeLink } from "Components/IconThemeLink";
import type { Callback } from "Types/Generics";
import type { OptionalRef } from "Types/React";
import { Routing } from "../Routing";
import { ScrollLink } from "../ScrollLink";

export const Nav = memo(
  forwardRef(function Nav(
    { onNavigate }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    return (
      <nav ref={ref} className="marketing-nav">
        {Routing.SECTION_IDS.map((ID, i) => {
          const Icon = Routing.ICONS[i];
          return (
            <ScrollLink key={ID} id={ID} Icon={Icon} onNavigate={onNavigate} />
          );
        })}
        <IconThemeLink
          to="/register/login"
          onClick={onNavigate}
          className="scroll-link"
          Icon={Routing.LOGIN_ICON}>
          Login
        </IconThemeLink>
      </nav>
    );
  }),
);

interface Props extends OptionalRef<HTMLDivElement> {
  onNavigate?: Callback<[MouseEvent<HTMLAnchorElement>]>;
}
