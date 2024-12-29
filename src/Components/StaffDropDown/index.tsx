import { memo, useCallback } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import {
  PaginatedDropDown,
  type Props as DDProps,
} from "Components/PaginatedDropDown";
import { listStaffMembers } from "GraphQL/Queries/listStaffMembers.gql";
import type {
  ListStaffMembersQuery,
  ListStaffMembersQueryVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { User } from "Icons/User";
import { Scope } from "State/Scope";
import type { Maybe } from "Types/Generics";
import type { IHTMLOption } from "Types/React";

function StaffDropDownComponent<M extends boolean | undefined>(
  props: Props<M>,
) {
  const fetch = useCallback(
    async (setState: ILoadingStateSetter, cursor: Maybe<number>) => {
      const client = new UIClient({ setState });
      try {
        const response = await client.executeQuery<
          ListStaffMembersQuery,
          ListStaffMembersQueryVariables
        >(listStaffMembers, {
          cursor,
          limit: 10,
          organizationId: Scope.getState().currentOrganizationId,
        });
        return {
          cursor: response.listStaffMembers.cursor,
          list: response.listStaffMembers.list.map(item => ({
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
      prefetch
      icon={<User />}
      fetch={fetch}
      title="Staff List"
      {...props}
    />
  );
}

export const StaffDropDown = memo(
  StaffDropDownComponent,
) as typeof StaffDropDownComponent;

type Props<M extends boolean | undefined> = Omit<
  DDProps<IHTMLOption, M>,
  "fetch" | "icon"
>;
