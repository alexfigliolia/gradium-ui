import type { ReactNode } from "react";
import { memo, useLayoutEffect, useRef } from "react";
import { FadingLoader } from "Components/FadingLoader";
import { Tile } from "Components/Tile";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const PropertyConfigurationTile = memo(
  function PropertyConfigurationTile({
    title,
    subtitle,
    children,
    loading,
    fetchingIndicator,
  }: Props) {
    const fade = useRef<Callback<[boolean]>>(null);

    useLayoutEffect(() => {
      fade.current?.(!loading);
    }, [loading]);

    return (
      <Tile className="spaces">
        <h2>
          {title}
          {fetchingIndicator && <FadingLoader ref={fade} />}
        </h2>
        <p>{subtitle}</p>
        {children}
      </Tile>
    );
  },
);

interface Props extends OptionalChildren {
  title: ReactNode;
  loading?: boolean;
  subtitle: ReactNode;
  fetchingIndicator?: boolean;
}
