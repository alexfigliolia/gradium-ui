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
import type { Callback } from "Types/Generics";

export class LivingSpacesModel extends ConfigurableSpaceModel<LivingSpace> {
  public readonly IMAGE_TYPE = GradiumImageType.LivingSpaceImage;
  public readonly FLOOR_PLAN_TYPE = GradiumImageType.LivingSpaceFloorPlan;
  constructor() {
    super("Living Spaces");
  }

  protected async fetchSpaces() {
    const response = await graphQLRequest<
      GetLivingSpacesQuery,
      GetLivingSpacesQueryVariables
    >(getLivingSpaces, {
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.getLivingSpaces;
  }

  protected async saveSpace(
    space: LivingSpace | Omit<LivingSpace, "id">,
    setState?: ILoadingStateSetter,
  ) {
    const client = new UIClient({ setState });
    const response = await client.executeQuery<
      CreateOrUpdateLivingSpaceMutation,
      CreateOrUpdateLivingSpaceMutationVariables
    >(createOrUpdateLivingSpace, {
      ...space,
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.createOrUpdateLivingSpace;
  }

  protected async deleteTransaction(
    id: number,
    setState: ILoadingStateSetter,
    callback: Callback,
  ) {
    const { name } = this.getById(id);
    const client = new UIClient({
      setState,
      errorMessage: `Something went wrong while deleting ${name ? `the living space ${name}` : "your living space"}. Please try again.`,
    });
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
    return response.deleteLivingSpace;
  }

  protected blankItem() {
    return {
      name: "",
      type: LivingSpaceType.Unit,
      beds: 0,
      baths: 0,
      images: [],
      floorPlans: [],
      size: "0",
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
      !isNaN(space.baths) &&
      // @ts-ignore
      parseFloat(space.size) == space.size
    );
  }
}
