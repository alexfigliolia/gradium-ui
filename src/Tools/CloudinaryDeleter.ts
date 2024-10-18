import { deleteImage } from "GraphQL/Mutations/deleteImage.gql";
import { saveImage } from "GraphQL/Mutations/saveImage.gql";
import { generateDestroySignature } from "GraphQL/Queries/generateDestroySignature.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  DeleteImageMutation,
  DeleteImageMutationVariables,
  DestroySignature,
  GenerateDestroySignatureQuery,
  GenerateDestroySignatureQueryVariables,
  GradiumImage,
  GradiumImageType,
  SaveImageMutation,
  SaveImageMutationVariables,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type { CloudinaryAssetScope } from "Types/Gradium";

export class CloudinaryDeleter {
  public static async delete(image: GradiumImage, scope: CloudinaryAssetScope) {
    const { id, url } = image;
    if (!id) {
      return;
    }
    let resolvedImage: GradiumImage | undefined;
    try {
      resolvedImage = await this.deleteReference(id, scope.type);
      const destination = await this.sign(this.toPublicID(url), scope.type);
      await this.deleteFromCloudinary(destination);
      Toasts.success("Your image has been deleted");
      return image;
    } catch (error) {
      if (resolvedImage) {
        void this.restoreReference(resolvedImage.url, scope);
      }
      this.toastError();
    }
  }

  public static async rollBack(url: string, type: GradiumImageType) {
    const destination = await this.sign(this.toPublicID(url), type);
    if (!destination) {
      return;
    }
    return this.deleteFromCloudinary(destination);
  }

  private static async deleteReference(id: number, type: GradiumImageType) {
    const response = await graphQLRequest<
      DeleteImageMutation,
      DeleteImageMutationVariables
    >(deleteImage, {
      id,
      type,
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.deleteImage;
  }

  private static async restoreReference(
    url: string,
    scope: CloudinaryAssetScope,
  ) {
    try {
      const response = await graphQLRequest<
        SaveImageMutation,
        SaveImageMutationVariables
      >(saveImage, {
        url,
        ...scope,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      });
      Properties.addImage(response.saveImage);
      return response.saveImage;
    } catch (error) {
      // silence
    }
  }

  private static async sign(publicId: string, type: GradiumImageType) {
    const response = await graphQLRequest<
      GenerateDestroySignatureQuery,
      GenerateDestroySignatureQueryVariables
    >(generateDestroySignature, {
      type,
      publicId,
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
