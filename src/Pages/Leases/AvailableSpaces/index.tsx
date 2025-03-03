import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { availableSpacesOptions } from "GraphQL/Queries/fetchAvailableSpaces.gql";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import { AvailabilitySection } from "../AvailabilitySection";
import { AvailableSpace } from "./AvailableSpace";

export const AvailableSpaces = (_: Propless) => {
  const { data, isLoading, error } = useInfiniteQuery(
    availableSpacesOptions(
      {
        limit: 20,
        organizationId: Scope.getState().currentOrganizationId,
      },
      {
        getNextPageParam: page => page.fetchAvailableSpaces.cursor,
        getPreviousPageParam: page => page.fetchAvailableSpaces.cursor,
      },
    ),
  );
  const list = useMemo(
    () => data?.pages?.flatMap?.(p => p.fetchAvailableSpaces.list) ?? [],
    [data],
  );

  return (
    <AvailabilitySection
      list={list}
      error={!!error}
      loading={isLoading}
      title="Available Spaces"
      renderItem={space => <AvailableSpace key={space.id} {...space} />}
    />
  );
};
