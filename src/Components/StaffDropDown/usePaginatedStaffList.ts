import type { GraphQLError } from "graphql";
import { useMemo } from "react";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { listStaffMembersOptions } from "GraphQL/Queries/listStaffMembers.gql";
import type { ListStaffMembersQuery } from "GraphQL/Types";
import { Scope } from "State/Scope";
import type { IHTMLOption } from "Types/React";

export const usePaginatedStaffList = (): [
  Required<IHTMLOption>[],
  boolean,
  FetchNextPage,
] => {
  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    listStaffMembersOptions(
      {
        limit: 10,
        organizationId: Scope.getState().currentOrganizationId,
      },
      {
        getNextPageParam: data => data.listStaffMembers.cursor,
        getPreviousPageParam: data => data.listStaffMembers.cursor,
      },
    ),
  );

  const list = useMemo(
    () =>
      data?.pages?.flatMap?.(p =>
        p.listStaffMembers.list.map(item => ({
          label: item.name,
          value: item.id.toString(),
        })),
      ) ?? [],
    [data?.pages],
  );

  return useMemo(
    () => [list, isFetching, fetchNextPage],
    [list, isFetching, fetchNextPage],
  );
};

type FetchNextPage = (
  options?: FetchNextPageOptions,
) => Promise<
  InfiniteQueryObserverResult<
    InfiniteData<ListStaffMembersQuery, unknown>,
    GraphQLError
  >
>;
