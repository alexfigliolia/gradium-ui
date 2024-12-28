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

export const StaffDropDown = memo(function StaffDropDown(props: Props) {
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
      multiple={false}
      icon={<User />}
      fetch={fetch}
      title="Staff List"
      {...props}
    />
  );
});

type Props = Omit<DDProps<IHTMLOption, false>, "fetch" | "icon" | "multiple">;
