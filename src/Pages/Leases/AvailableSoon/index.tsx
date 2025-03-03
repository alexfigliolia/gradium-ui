import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { soonToBeAvailableSpaceOptions } from "GraphQL/Queries/fetchSoonToBeAvailableSpaces.gql";
import { currentOrganizationId, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import { AvailabilitySection } from "../AvailabilitySection";
import { SpaceSoonToBeAvailable } from "./SpaceSoonToBeAvailable";

export const AvailableSoon = (_: Propless) => {
  const organizationId = useScope(currentOrganizationId);
  const { data, isLoading, error } = useInfiniteQuery(
    soonToBeAvailableSpaceOptions(
      {
        organizationId,
        limit: 20,
      },
      {
        getNextPageParam: page => page.fetchSoonToBeAvailableSpaces.cursor,
        getPreviousPageParam: page => page.fetchSoonToBeAvailableSpaces.cursor,
      },
    ),
  );
  const list = useMemo(
    () =>
      data?.pages?.flatMap?.(p => p.fetchSoonToBeAvailableSpaces.list) ?? [],
    [data],
  );

  return (
    <AvailabilitySection
      list={list}
      error={!!error}
      loading={isLoading}
      title="Available Soon"
      renderItem={space => <SpaceSoonToBeAvailable key={space.id} {...space} />}
    />
  );
};
