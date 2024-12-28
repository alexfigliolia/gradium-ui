import { memo, useCallback } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import type { Props as PaginatedDropDownProps } from "Components/PaginatedDropDown";
import { PaginatedDropDown } from "Components/PaginatedDropDown";
import { listPeople } from "GraphQL/Queries/listPeople.gql";
import type { ListPeopleQuery, ListPeopleQueryVariables } from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { User } from "Icons/User";
import { Scope } from "State/Scope";
import type { Maybe } from "Types/Generics";
import type { IHTMLOption } from "Types/React";

function PeopleDropDownComponent<M extends boolean | undefined>({
  name = "user",
  label = "Resident",
  title = "Staff & Residents",
  ...rest
}: Props<M>) {
  const fetchPeople = useCallback(
    async (setState: ILoadingStateSetter, cursor: Maybe<number>) => {
      const client = new UIClient({ setState });
      try {
        const response = await client.executeQuery<
          ListPeopleQuery,
          ListPeopleQueryVariables
        >(listPeople, {
          cursor,
          limit: 10,
          organizationId: Scope.getState().currentOrganizationId,
        });
        return {
          cursor: response.listPeople.cursor,
          list: response.listPeople.list.map(item => ({
            label: item.name,
            value: item.id.toString(),
          })),
        };
      } catch (error) {
        // silence
      }
    },
    [],
  );

  return (
    <PaginatedDropDown
      {...rest}
      name={name}
      label={label}
      icon={<User />}
      title={title}
      fetch={fetchPeople}
    />
  );
}

export const PeopleDropDown = memo(
  PeopleDropDownComponent,
) as typeof PeopleDropDownComponent;

interface Props<M extends boolean | undefined>
  extends Pick<
    PaginatedDropDownProps<IHTMLOption, M>,
    "multiple" | "onChange" | "required" | "prefetch" | "value"
  > {
  name?: string;
  label?: string;
  title?: string;
}
