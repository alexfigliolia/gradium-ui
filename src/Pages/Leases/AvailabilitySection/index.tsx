import {
  Fragment,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { HorizontalList } from "Components/HorizontalList";
import { SearchBar } from "Components/SearchBar";
import { SearchContext } from "Components/SearchContext";
import { PageTitle } from "Layouts/Management";
import type { Callback } from "Types/Generics";
import { AvailabilitySkeleton } from "../AvailabilitySkeleton";
import { DummySpaceCard } from "../AvailableSpaceCard";

export const AvailabilitySection = <T,>({
  list,
  error,
  title,
  loading,
  renderItem,
  onScrollEnd,
}: Props<T>) => {
  const initialLoad = useRef(true);
  const { search, onSearch } = useContext(SearchContext);

  const items = useMemo(
    () => list.map(space => renderItem(space)),
    [list, renderItem],
  );

  const handleScrollEnd = useCallback(() => {
    if (!loading) {
      onScrollEnd();
    }
  }, [loading, onScrollEnd]);

  useEffect(() => {
    if (initialLoad.current && !loading) {
      initialLoad.current = false;
    }
  }, [loading]);

  if (!search && !list.length && !loading && !error) {
    return null;
  }

  if (loading && initialLoad.current) {
    return <AvailabilitySkeleton title={title} />;
  }

  return (
    <Fragment>
      <PageTitle title={title} className="lease-title">
        <SearchBar
          value={search}
          pending={loading}
          pendingIndicator
          placeholder="Search"
          onChange={onSearch}
        />
      </PageTitle>
      <HorizontalList onScrollEnd={handleScrollEnd}>
        {items.length ? items : <DummySpaceCard />}
      </HorizontalList>
    </Fragment>
  );
};

interface Props<T> {
  list: T[];
  title: string;
  loading: boolean;
  error: boolean;
  onScrollEnd: Callback;
  renderItem: Callback<[item: T], ReactNode>;
}
