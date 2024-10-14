import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { updateBasicPropertyInfo } from "GraphQL/Mutations/updateBasicPropertyInfo.gql";
import type {
  UpdateBasicPropertyInfoMutation,
  UpdateBasicPropertyInfoMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Validators } from "Tools/Validators";

export class Controller {
  private inFlight = false;
  private inFlightKeys = new Set<string>();
  private setTable: Dispatch<SetStateAction<Set<string>>>;
  private timer: ReturnType<typeof setTimeout> | null = null;
  constructor(setTable: Dispatch<SetStateAction<Set<string>>>) {
    this.setTable = setTable;
  }

  public onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    this.setTable(table => {
      const input = e.target as HTMLInputElement;
      const copy = new Set(table);
      if (input.value !== input.defaultValue) {
        copy.add(input.name);
        if (this.inFlight) {
          this.inFlightKeys.add(input.name);
        }
      } else {
        copy.delete(input.name);
        if (this.inFlight) {
          this.inFlightKeys.add(input.name);
        }
      }
      return copy;
    });
  };

  public submit = async (data: FormData, setState: ILoadingStateSetter) => {
    this.inFlight = true;
    try {
      const name = Validators.propertyNameParser(data);
      const client = new UIClient({
        setState,
        successMessage: `<strong>${name}</strong> was updated successfully`,
      });
      const address1 = Validators.parseForm(data, "address1");
      const address2 = Validators.parseForm(data, "address2");
      const city = Validators.parseForm(data, "city");
      const state = Validators.parseForm(data, "state");
      const zipCode = Validators.parseForm(data, "zipCode");
      const response = await client.executeQuery<
        UpdateBasicPropertyInfoMutation,
        UpdateBasicPropertyInfoMutationVariables
      >(
        updateBasicPropertyInfo,
        {
          name,
          address1,
          address2,
          city,
          state,
          zipCode,
          propertyId: Properties.getState().current,
          organizationId: Scope.getState().currentOrganizationId,
        },
        this.onComplete,
      );
      Properties.updateBasicInfo(response.updateBasicPropertyInfo);
    } catch (error) {
      this.inFlight = false;
    }
  };

  public destroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
      this.inFlight = false;
      this.inFlightKeys = new Set();
    }
  }

  private onComplete = () => {
    this.timer = setTimeout(() => {
      this.setTable(this.inFlightKeys);
      this.destroy();
    }, 1000);
  };
}
