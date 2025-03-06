import { useCallback, useContext, useMemo } from "react";
import { SearchContext } from "Components/SearchContext";
import type { Propless } from "Types/React";
import { AvailabilitySection } from "../AvailabilitySection";
import { SpaceSoonToBeAvailable } from "./SpaceSoonToBeAvailable";
import { useSoonToBeAvailableSpaces } from "./useSoonToBeAvailableSpaces";

export const AvailableSoon = (_: Propless) => {
  const { search } = useContext(SearchContext);
  const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
    useSoonToBeAvailableSpaces(search);

  const onScrollEnd = useCallback(() => {
    if (hasNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const list = useMemo(
    () =>
      data?.pages?.flatMap?.(p => p.fetchSoonToBeAvailableSpaces.list) ?? [],
    [data],
  );

  return (
    <AvailabilitySection
      list={list}
      error={isError}
      title="Available Soon"
      onScrollEnd={onScrollEnd}
      loading={isLoading || isFetching}
      renderItem={space => <SpaceSoonToBeAvailable key={space.id} {...space} />}
    />
  );
};
