import { useCallback, useContext, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchContext } from "Components/SearchContext";
import { soonToBeAvailableSpaceOptions } from "GraphQL/Queries/fetchSoonToBeAvailableSpaces.gql";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import { AvailabilitySection } from "../AvailabilitySection";
import { SpaceSoonToBeAvailable } from "./SpaceSoonToBeAvailable";

export const AvailableSoon = (_: Propless) => {
  const { search } = useContext(SearchContext);
  const { data, isLoading, isError, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      soonToBeAvailableSpaceOptions(
        {
          search,
          limit: 20,
          organizationId: Scope.getState().currentOrganizationId,
        },
        {
          getNextPageParam: page => page.fetchSoonToBeAvailableSpaces.cursor,
          getPreviousPageParam: page =>
            page.fetchSoonToBeAvailableSpaces.cursor,
        },
      ),
    );

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
