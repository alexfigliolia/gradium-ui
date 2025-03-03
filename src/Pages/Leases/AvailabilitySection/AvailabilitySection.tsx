import {
  Fragment,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { SearchBar } from "Components/SearchBar";
import { PageTitle } from "Layouts/Management";
import type { Callback } from "Types/Generics";
import { AvailabilitySkeleton } from "../AvailabilitySkeleton";
import { DummySpaceCard } from "../AvailableSpaceCard";
import { SpaceList } from "../SpaceList";
import { AvailabilityContext } from "./Context";

export const AvailabilitySection = <T,>({
  list,
  error,
  title,
  loading,
  renderItem,
  onScrollEnd,
}: Props<T>) => {
  const initialLoad = useRef(true);
  const { search, onSearch } = useContext(AvailabilityContext);

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
      <SpaceList onScrollEnd={handleScrollEnd}>
        {items.length ? items : <DummySpaceCard />}
      </SpaceList>
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
