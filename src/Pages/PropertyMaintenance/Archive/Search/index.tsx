import type { ChangeEvent } from "react";
import { useCallback } from "react";
import { SearchBar } from "Components/SearchBar";
import { TasksArchive } from "State/TasksArchive";
import type { Propless } from "Types/React";
import "./styles.scss";

export const Search = (_: Propless) => {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    TasksArchive.search(e.target.value);
  }, []);

  return (
    <SearchBar
      placeholder="Search"
      className="archive-search"
      onChange={onChange}
    />
  );
};
