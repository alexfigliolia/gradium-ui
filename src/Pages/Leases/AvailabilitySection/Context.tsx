import type { ChangeEvent } from "react";
import { createContext, useCallback, useMemo, useState } from "react";
import type { Callback } from "Types/Generics";
import type { OptionalChildren } from "Types/React";

export const AvailabilityContext = createContext<IAvailabilityContext>({
  search: "",
  onSearch: () => {},
  clearSearch: () => {},
});

export const AvailabilityContextProvider = ({ children }: OptionalChildren) => {
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
    <AvailabilityContext.Provider value={value}>
      {children}
    </AvailabilityContext.Provider>
  );
};

interface IAvailabilityContext {
  search: string;
  clearSearch: Callback;
  onSearch: Callback<[ChangeEvent<HTMLInputElement>]>;
}
