import { generateCloudinarySignature } from "GraphQL/Queries/generateCloudinarySignature.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  GenerateCloudinarySignatureQuery,
  GenerateCloudinarySignatureQueryVariables,
} from "GraphQL/Types";
import { PropertyImageType } from "GraphQL/Types";
import { Scope } from "State/Scope";
import { Deleter } from "./Deleter";
import { Uploader } from "./Uploader";

export class Controller {
  public Deleter = new Deleter(Controller.sign);
  public Uploader = new Uploader(Controller.sign);

  private static sign = async () => {
    const response = await graphQLRequest<
      GenerateCloudinarySignatureQuery,
      GenerateCloudinarySignatureQueryVariables
    >(generateCloudinarySignature, {
      type: PropertyImageType.PropertyImage,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.generateCloudinarySignature;
  };
}
