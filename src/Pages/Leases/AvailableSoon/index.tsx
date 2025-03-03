import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchBar } from "Components/SearchBar";
import { soonToBeAvailableSpaceOptions } from "GraphQL/Queries/fetchSoonToBeAvailableSpaces.gql";
import { PageTitle } from "Layouts/Management";
import { currentOrganizationId, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import { SpaceList } from "../SpaceList";
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
    <Fragment>
      <PageTitle title="Available Soon" className="lease-title">
        <SearchBar placeholder="Search" />
      </PageTitle>
      <SpaceList>
        {list.map(space => (
          <SpaceSoonToBeAvailable key={space.id} {...space} />
        ))}
      </SpaceList>
    </Fragment>
  );
};
