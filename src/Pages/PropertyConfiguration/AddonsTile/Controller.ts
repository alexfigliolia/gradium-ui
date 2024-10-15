import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { modifyPropertyAddons } from "GraphQL/Mutations/modifyPropertyAddons.gql";
import type {
  ModifyPropertyAddonsMutation,
  ModifyPropertyAddonsMutationVariables,
  PropertyAddonType,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";

export class Controller {
  private setState: ILoadingStateSetter;
  constructor(setState: ILoadingStateSetter) {
    this.setState = setState;
  }

  public synchronize = (
    current: Set<PropertyAddonType>,
    selections: Set<PropertyAddonType>,
  ) => {
    const [additions, deletions] = this.diff(current, selections);
    if (!additions.size && !deletions.size) {
      return;
    }
    return this.update(additions, deletions);
  };

  private async update(
    additions: Set<PropertyAddonType>,
    deletions: Set<PropertyAddonType>,
  ) {
    try {
      const { current, properties } = Properties.getState();
      const client = new UIClient({
        setState: this.setState,
        successMessage: `<strong>${this.formatName(properties[current].name)}</strong> addons have been updated!`,
      });
      const response = await client.executeQuery<
        ModifyPropertyAddonsMutation,
        ModifyPropertyAddonsMutationVariables
      >(modifyPropertyAddons, {
        propertyId: current,
        organizationId: Scope.getState().currentOrganizationId,
        additions: Array.from(additions),
        deletions: this.gatherIds(deletions),
      });
      Properties.updateCurrentAddons(response.modifyPropertyAddons);
    } catch (error) {
      // silence
    }
  }

  private diff(
    current: Set<PropertyAddonType>,
    selections: Set<PropertyAddonType>,
  ) {
    const additions = new Set<PropertyAddonType>();
    const deletions = new Set<PropertyAddonType>();
    for (const addon of selections) {
      if (!current.has(addon)) {
        additions.add(addon);
      }
    }
    for (const addon of current) {
      if (!selections.has(addon)) {
        deletions.add(addon);
      }
    }
    return [additions, deletions];
  }

  private gatherIds(deletions: Set<PropertyAddonType>) {
    const ids: number[] = [];
    const { currentAddons, properties, current } = Properties.getState();
    if (!currentAddons.size) {
      return ids;
    }
    const { addons } = properties[current];
    for (const addon of addons) {
      if (deletions.has(addon.type)) {
        ids.push(addon.id);
      }
    }
    return ids;
  }

  private formatName(name: string) {
    if (name.endsWith("s")) {
      return `${name}'`;
    }
    return `${name}'s`;
  }
}
