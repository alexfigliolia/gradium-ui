import { useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchBar } from "Components/SearchBar";
import { availableSpacesOptions } from "GraphQL/Queries/fetchAvailableSpaces.gql";
import { PageTitle } from "Layouts/Management";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import { SpaceList } from "../SpaceList";
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
    <Fragment>
      <PageTitle title="Available Spaces" className="lease-title">
        <SearchBar placeholder="Search" />
      </PageTitle>
      <SpaceList>
        {list.map(space => (
          <AvailableSpace key={space.id} {...space} />
        ))}
      </SpaceList>
    </Fragment>
  );
};
