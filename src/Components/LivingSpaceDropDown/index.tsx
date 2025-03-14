import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { DDValue } from "Components/DropDown/types";
import type { Props as DDProps } from "Components/PaginatedDropDown";
import { PaginatedDropDown } from "Components/PaginatedDropDown";
import { listSpacesForRentOptions } from "GraphQL/Queries/listSpacesForRent.gql";
import { Building } from "Icons/Building";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import type { IHTMLOption } from "Types/React";

export const LivingSpaceDropDown = <M extends boolean | undefined>(
  props: Props<M>,
) => {
  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    listSpacesForRentOptions(
      {
        limit: 10,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      },
      {
        getNextPageParam: data => data.listSpacesForRent.cursor,
        getPreviousPageParam: data => data.listSpacesForRent.cursor,
      },
    ),
  );

  const spaces = useMemo(
    () =>
      data?.pages?.flatMap?.(p =>
        p.listSpacesForRent.list.map(item => ({
          label: item.name,
          value: item.id.toString(),
        })),
      ) ?? [],
    [data?.pages],
  );

  return (
    <PaginatedDropDown
      label="Space"
      list={spaces}
      loading={isFetching}
      name="living-space"
      icon={<Building />}
      title="Living Spaces"
      fetchNextPage={fetchNextPage}
      {...props}
    />
  );
};

interface Props<M extends boolean | undefined>
  extends Pick<
    DDProps<IHTMLOption, M, () => void>,
    "onChange" | "multiple" | "required"
  > {
  value: DDValue<M>;
}
