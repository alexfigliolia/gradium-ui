import { useCallback, useContext, useMemo } from "react";
import { SearchContext } from "Components/SearchContext";
import type { Propless } from "Types/React";
import { AvailabilitySection } from "../AvailabilitySection";
import { AvailableSpace } from "./AvailableSpace";
import { useAvailableSpaces } from "./useAvailableSpaces";

export const AvailableSpaces = (_: Propless) => {
  const { search } = useContext(SearchContext);
  const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
    useAvailableSpaces(search);

  const onScrollEnd = useCallback(() => {
    if (hasNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const list = useMemo(
    () => data?.pages?.flatMap?.(p => p.fetchAvailableSpaces.list) ?? [],
    [data],
  );

  return (
    <AvailabilitySection
      list={list}
      error={!!error}
      title="Available Spaces"
      onScrollEnd={onScrollEnd}
      loading={isLoading || isFetching}
      renderItem={space => <AvailableSpace key={space.id} {...space} />}
    />
  );
};
