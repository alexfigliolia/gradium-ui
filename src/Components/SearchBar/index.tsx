import type { HTMLProps } from "react";
import { memo, useCallback, useRef } from "react";
import { useClassNames } from "@figliolia/classnames";
import { Search } from "Icons/Search";
import "./styles.scss";

export const SearchBar = memo(function SearchBar({
  className,
  ...rest
}: HTMLProps<HTMLInputElement>) {
  const input = useRef<HTMLInputElement>(null);
  const classes = useClassNames("search-bar", className);
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
      </div>
    </search>
  );
});
