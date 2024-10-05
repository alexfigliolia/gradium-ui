import type { UserAffiliation } from "GraphQL/Types";
import { BaseModel } from "Models/BaseModel";
import type { IScope } from "./types";

export class Accessor extends BaseModel<IScope> {
  protected setCurrentOrganization(id: number) {
    const current = this.affiliationById(id);
    if (!current) {
      return;
    }
    this.setCurrentAffiliation(current);
  }

  protected setCurrentAffiliation(current: UserAffiliation) {
    this.update(state => {
      state.currentOrganizationId = current.organization.id;
      state.currentOrganizationName = current.organization.name;
      state.currentPermissions = new Set(current.roles.map(r => r.role));
    });
  }

  protected affiliationById(id: number) {
    return this.getState().affiliations.find(v => v.organization.id === id);
  }
}
