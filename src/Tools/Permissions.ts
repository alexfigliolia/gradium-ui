import { PersonRoleType } from "GraphQL/Types";

export class Permissions {
  grants: Set<PersonRoleType>;
  constructor(grants: Set<PersonRoleType>) {
    this.grants = grants;
  }

  public hasPermission(...required: PersonRoleType[]) {
    return Permissions.hasPermission(this.grants, ...required);
  }

  private static readonly permissions: Record<
    PersonRoleType,
    Set<PersonRoleType>
  > = {
    owner: new Set([
      PersonRoleType.Owner,
      PersonRoleType.Manager,
      PersonRoleType.Maintenance,
    ]),
    manager: new Set([PersonRoleType.Manager, PersonRoleType.Maintenance]),
    resident: new Set([PersonRoleType.Resident]),
    maintenance: new Set([PersonRoleType.Maintenance]),
  };

  public static hasPermission(
    grants: Set<PersonRoleType>,
    ...required: PersonRoleType[]
  ) {
    for (const grant of grants) {
      const access = this.permissions[grant];
      if (!access) {
        continue;
      }
      for (const requirement of required) {
        if (access.has(requirement)) {
          return true;
        }
      }
    }
    return false;
  }
}
