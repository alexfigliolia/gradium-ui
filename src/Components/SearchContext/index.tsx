import type { ChangeEvent } from "react";
import { createContext, useCallback, useMemo, useState } from "react";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";

export const SearchContext = createContext<ISearchContext>({
  search: "",
  onSearch: () => {},
  clearSearch: () => {},
});

export const SearchContextProvider = ({ children }: OptionalChildren) => {
  const [search, setSearch] = useState("");

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const value = useMemo(
    () => ({ search, onSearch, clearSearch }),
    [search, clearSearch, onSearch],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

interface ISearchContext {
  search: string;
  clearSearch: Callback;
  onSearch: Callback<[ChangeEvent<HTMLInputElement>]>;
}
