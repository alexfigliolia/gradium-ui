import { useInfiniteQuery } from "@tanstack/react-query";
import { availableSpacesOptions } from "GraphQL/Queries/fetchAvailableSpaces.gql";
import { Scope } from "State/Scope";
import { useEmitter } from "../EventEmitter";

export const useAvailableSpaces = (search = "") => {
  const payload = useInfiniteQuery(
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
  useEmitter("refetch", () => void payload.refetch());
  return payload;
};
