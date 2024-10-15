import { deletePropertyImage } from "GraphQL/Mutations/deletePropertyImage.gql";
import { generateDestroySignature } from "GraphQL/Queries/generateDestroySignature.gql";
import { graphQLRequest } from "GraphQL/request";
import {
  type DeletePropertyImageMutation,
  type DeletePropertyImageMutationVariables,
  type DestroySignature,
  type GenerateDestroySignatureQuery,
  type GenerateDestroySignatureQueryVariables,
  type PropertyImage,
  PropertyImageType,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";

export class CloudinaryDeleter {
  public static async delete(image: PropertyImage) {
    const { id, url } = image;
    if (!id) {
      return;
    }
    const destination = await this.generateSignature(this.toPublicID(url));
    if (!destination) {
      return;
    }
    try {
      await this.deleteFromCloudinary(destination);
      await graphQLRequest<
        DeletePropertyImageMutation,
        DeletePropertyImageMutationVariables
      >(deletePropertyImage, {
        id,
        organizationId: Scope.getState().currentOrganizationId,
      });
      Properties.deleteImage(image);
      Toasts.success("Your property image has been deleted");
    } catch (error) {
      this.toastError();
    }
  }

  private static async sign(publicId: string) {
    const response = await graphQLRequest<
      GenerateDestroySignatureQuery,
      GenerateDestroySignatureQueryVariables
    >(generateDestroySignature, {
      publicId,
      type: PropertyImageType.PropertyImage,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.generateDestroySignature;
  }

  private static async deleteFromCloudinary(destination: DestroySignature) {
    const { name, __typename: _2, ...rest } = destination;
    const data = new FormData();
    for (const K in rest) {
      const key = K as keyof Omit<DestroySignature, "__typename" | "name">;
      data.append(key, rest[key].toString());
    }
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${name}/image/destroy`,
      {
        method: "POST",
        body: data,
      },
    );
    if (!response.ok) {
      throw "Failed at cloudinary";
    }
    const json = await response.json();
    if (json?.result === "not found") {
      throw "Failed at cloudinary";
    }
  }

  private static async generateSignature(publicId: string) {
    try {
      const destination = await this.sign(publicId);
      return destination;
    } catch (error) {
      this.toastError();
    }
  }

  private static toastError() {
    Toasts.error(
      "Something went wrong while deleting your image. Please try again",
    );
  }

  private static toPublicID(url: string) {
    const tokens = url.split("/").slice(-3);
    const file = tokens
      .pop()!
      .replace(/([^.]+$)/, "")
      .slice(0, -1);
    tokens.push(file);
    return tokens.join("/");
  }
}
