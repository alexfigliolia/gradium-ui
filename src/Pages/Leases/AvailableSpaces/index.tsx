import { useCallback, useContext, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { availableSpacesOptions } from "GraphQL/Queries/fetchAvailableSpaces.gql";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import {
  AvailabilityContext,
  AvailabilitySection,
} from "../AvailabilitySection";
import { AvailableSpace } from "./AvailableSpace";

export const AvailableSpaces = (_: Propless) => {
  const { search } = useContext(AvailabilityContext);
  const { data, isLoading, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      availableSpacesOptions(
        {
          search,
          limit: 4,
          organizationId: Scope.getState().currentOrganizationId,
        },
        {
          getNextPageParam: page => page.fetchAvailableSpaces.cursor,
          getPreviousPageParam: page => page.fetchAvailableSpaces.cursor,
        },
      ),
    );

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
