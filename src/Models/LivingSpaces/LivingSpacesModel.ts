import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import { createOrUpdateLivingSpace } from "GraphQL/Mutations/createOrUpdateLivingSpace.gql";
import { deleteLivingSpace } from "GraphQL/Mutations/deleteLivingSpace.gql";
import { getLivingSpaces } from "GraphQL/Queries/getLivingSpaces.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  CreateOrUpdateLivingSpaceMutation,
  CreateOrUpdateLivingSpaceMutationVariables,
  DeleteLivingSpaceMutation,
  DeleteLivingSpaceMutationVariables,
  GetLivingSpacesQuery,
  GetLivingSpacesQueryVariables,
  LivingSpace,
} from "GraphQL/Types";
import { GradiumImageType, LivingSpaceType } from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type { Callback } from "Types/Generics";

export class LivingSpacesModel extends ConfigurableSpaceModel<LivingSpace> {
  public IMAGE_TYPE = GradiumImageType.LivingSpaceImage;
  public FLOOR_PLAN_TYPE = GradiumImageType.LivingSpaceFloorPlan;
  constructor() {
    super("Living Spaces");
  }

  public async fetch() {
    this.loading(true);
    const name = Properties.getCurrent("name");
    try {
      const response = await graphQLRequest<
        GetLivingSpacesQuery,
        GetLivingSpacesQueryVariables
      >(getLivingSpaces, {
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      });
      this.hashList(response.getLivingSpaces);
    } catch (error) {
      Toasts.error(
        `Something went wrong while fetching the living spaces for <strong>${name}</strong>.`,
      );
    }
    this.loading(false);
  }

  public async save(id: number, setState: ILoadingStateSetter) {
    const livingSpace = this.getState().list[id];
    const { name } = livingSpace;
    const client = new UIClient({
      setState,
      errorMessage: this.getError(name),
    });
    const response = await client.executeQuery<
      CreateOrUpdateLivingSpaceMutation,
      CreateOrUpdateLivingSpaceMutationVariables
    >(createOrUpdateLivingSpace, {
      ...livingSpace,
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
    });
    const space = response.createOrUpdateLivingSpace;
    this.updateByIdentifier(space.id, space);
    if (space.id !== livingSpace.id) {
      this.delete(livingSpace.id);
    }
  }

  public async saveBeforeUnmount(id: number) {
    const livingSpace = this.getState().list[id];
    try {
      const response = await graphQLRequest<
        CreateOrUpdateLivingSpaceMutation,
        CreateOrUpdateLivingSpaceMutationVariables
      >(createOrUpdateLivingSpace, {
        ...livingSpace,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      });
      const space = response.createOrUpdateLivingSpace;
      this.updateByIdentifier(space.id, space);
      if (space.id !== livingSpace.id) {
        this.delete(livingSpace.id);
      }
    } catch (error) {
      Toasts.error(
        `<strong>${livingSpace.name}</strong> did not save before leaving. Please try again`,
      );
    }
  }

  public async deleteItem(
    id: number,
    setState: ILoadingStateSetter,
    callback?: Callback,
  ) {
    if (id === -1) {
      this.delete(id);
      return callback?.();
    }
    const client = new UIClient({ setState });
    const response = await client.executeQuery<
      DeleteLivingSpaceMutation,
      DeleteLivingSpaceMutationVariables
    >(
      deleteLivingSpace,
      {
        id,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      },
      callback,
    );
    this.delete(response.deleteLivingSpace.id);
  }

  private getError(name: string) {
    if (name) {
      return `<strong>${name}</strong> didn't save properly. Please check your inputs and try again.`;
    }
    return "Your living space didn't save property. Please check your inputs and try again.";
  }

  public get blank() {
    return {
      id: -1,
      name: "",
      type: LivingSpaceType.Unit,
      beds: 0,
      baths: 0,
      images: [],
      floorPlans: [],
      footage: 0,
      propertyId: Properties.getState().current,
    };
  }

  public validate(space?: LivingSpace) {
    if (!space) {
      return false;
    }
    return (
      space.name.length !== 0 &&
      space.type.length >= 4 &&
      !isNaN(space.beds) &&
      !isNaN(space.baths)
    );
  }
}
