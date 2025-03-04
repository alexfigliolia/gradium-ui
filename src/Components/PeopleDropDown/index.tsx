import { memo, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Props as PaginatedDropDownProps } from "Components/PaginatedDropDown";
import { PaginatedDropDown } from "Components/PaginatedDropDown";
import { listPeopleOptions } from "GraphQL/Queries/listPeople.gql";
import { User } from "Icons/User";
import { Scope } from "State/Scope";
import type { IHTMLOption } from "Types/React";

function PeopleDropDownComponent<
  M extends boolean | undefined,
  F extends (...args: never[]) => any,
>({
  name = "user",
  label = "Resident",
  title = "Staff & Residents",
  ...rest
}: Props<M, F>) {
  const { data, isFetching, fetchNextPage } = useInfiniteQuery(
    listPeopleOptions(
      {
        limit: 10,
        organizationId: Scope.getState().currentOrganizationId,
      },
      {
        getNextPageParam: data => data.listPeople.cursor,
        getPreviousPageParam: data => data.listPeople.cursor,
      },
    ),
  );

  const list = useMemo(
    () =>
      data?.pages?.flatMap?.(p =>
        p.listPeople.list.map(item => ({
          label: item.name,
          value: item.id.toString(),
        })),
      ) ?? [],
    [data?.pages],
  );

  return (
    <PaginatedDropDown
      {...rest}
      list={list}
      name={name}
      label={label}
      title={title}
      icon={<User />}
      loading={isFetching}
      fetchNextPage={fetchNextPage}
    />
  );
}

export const PeopleDropDown = memo(
  PeopleDropDownComponent,
) as typeof PeopleDropDownComponent;

interface Props<
  M extends boolean | undefined,
  F extends (...args: never[]) => any,
> extends Pick<
    PaginatedDropDownProps<IHTMLOption, M, F>,
    "multiple" | "onChange" | "required" | "value" | "children"
  > {
  name?: string;
  label?: string;
  title?: string;
}
