import { useContext, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { soonToBeAvailableSpaceOptions } from "GraphQL/Queries/fetchSoonToBeAvailableSpaces.gql";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import {
  AvailabilityContext,
  AvailabilitySection,
} from "../AvailabilitySection";
import { SpaceSoonToBeAvailable } from "./SpaceSoonToBeAvailable";

export const AvailableSoon = (_: Propless) => {
  const { search } = useContext(AvailabilityContext);
  const { data, isLoading, isError, isFetching } = useInfiniteQuery(
    soonToBeAvailableSpaceOptions(
      {
        search,
        limit: 20,
        organizationId: Scope.getState().currentOrganizationId,
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
      error={isError}
      title="Available Soon"
      loading={isLoading || isFetching}
      renderItem={space => <SpaceSoonToBeAvailable key={space.id} {...space} />}
    />
  );
};
