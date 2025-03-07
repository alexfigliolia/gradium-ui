import { useContext, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchBar } from "Components/SearchBar";
import { SearchContext } from "Components/SearchContext";
import { fetchLeasesOptions } from "GraphQL/Queries/fetchLeases.gql";
import { PageTitle } from "Layouts/Management";
import { Scope } from "State/Scope";
import type { Propless } from "Types/React";
import { Lease } from "./Lease";
import "./styles.scss";

export const LeasesList = (_: Propless) => {
  const { search, onSearch } = useContext(SearchContext);
  const { data, isFetching } = useInfiniteQuery(
    fetchLeasesOptions(
      {
        search,
        limit: 10,
        organizationId: Scope.getState().currentOrganizationId,
      },
      {
        getNextPageParam: page => page.fetchLeases.cursor,
        getPreviousPageParam: page => page.fetchLeases.cursor,
      },
    ),
  );
  const leases = useMemo(
    () => data?.pages?.flatMap?.(page => page.fetchLeases.list) ?? [],
    [data?.pages],
  );
  return (
    <div className="leases-list">
      <PageTitle title="Leases" className="lease-title">
        <SearchBar
          value={search}
          pendingIndicator
          pending={isFetching}
          placeholder="Search"
          onChange={onSearch}
        />
      </PageTitle>
      <div className="list">
        {leases.map(lease => (
          <Lease key={lease.id} {...lease} />
        ))}
      </div>
    </div>
  );
};
