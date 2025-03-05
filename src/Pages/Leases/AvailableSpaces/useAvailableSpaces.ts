import { useInfiniteQuery } from "@tanstack/react-query";
import { availableSpacesOptions } from "GraphQL/Queries/fetchAvailableSpaces.gql";
import { Scope } from "State/Scope";

export const useAvailableSpaces = (search = "") => {
  return useInfiniteQuery(
    availableSpacesOptions(
      {
        search,
        limit: 10,
        organizationId: Scope.getState().currentOrganizationId,
      },
      {
        getNextPageParam: page => page.fetchAvailableSpaces.cursor,
        getPreviousPageParam: page => page.fetchAvailableSpaces.cursor,
      },
    ),
  );
};
