import type { HTMLProps } from "react";
import { memo, useCallback, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { TriangleLoader } from "Components/TriangleLoader";
import { Search } from "Icons/Search";
import "./styles.scss";

export const SearchBar = memo(function SearchBar({
  className,
  pending = false,
  pendingIndicator = false,
  ...rest
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const classes = useClassNames("search-bar", className, { pending });

  const focusInput = useCallback(() => {
    input.current?.focus();
  }, []);

  return (
    <search className={classes}>
      <div>
        <button onClick={focusInput} tabIndex={-1}>
          <Search />
        </button>
        <input ref={input} type="search" {...rest} />
        {(pending || pendingIndicator) && (
          <div>
            <TriangleLoader />
          </div>
        )}
      </div>
    </search>
  );
});

interface Props extends HTMLProps<HTMLInputElement> {
  pending?: boolean;
  pendingIndicator?: boolean;
}
