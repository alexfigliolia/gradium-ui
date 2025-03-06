import { useInfiniteQuery } from "@tanstack/react-query";
import { soonToBeAvailableSpaceOptions } from "GraphQL/Queries/fetchSoonToBeAvailableSpaces.gql";
import { Scope } from "State/Scope";
import { useEmitter } from "../EventEmitter";

export const useSoonToBeAvailableSpaces = (search = "") => {
  const payload = useInfiniteQuery(
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
  useEmitter("refetch", () => void payload.refetch());
  return payload;
};
