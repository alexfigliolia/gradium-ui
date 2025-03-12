import { deleteDocument } from "GraphQL/Mutations/deleteDocument.gql";
import { deleteImage } from "GraphQL/Mutations/deleteImage.gql";
import { saveDocument } from "GraphQL/Mutations/saveDocument.gql";
import { saveImage } from "GraphQL/Mutations/saveImage.gql";
import { generateDestroySignature } from "GraphQL/Queries/generateDestroySignature.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  DeleteDocumentMutation,
  DeleteDocumentMutationVariables,
  DeleteImageMutation,
  DeleteImageMutationVariables,
  DestroySignature,
  GenerateDestroySignatureQuery,
  GenerateDestroySignatureQueryVariables,
  GradiumDocument,
  GradiumDocumentType,
  GradiumImage,
  GradiumImageType,
  SaveDocumentMutation,
  SaveDocumentMutationVariables,
  SaveImageMutation,
  SaveImageMutationVariables,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type {
  CloudinaryDocumentScope,
  CloudinaryImageScope,
} from "Types/Gradium";

export class CloudinaryDeleter {
  public static async deleteImage(
    image: GradiumImage,
    scope: CloudinaryImageScope,
  ) {
    const { id, url } = image;
    if (!id) {
      return;
    }
    let resolvedImage: GradiumImage | undefined;
    try {
      resolvedImage = await this.deleteImageReference(id, scope.type);
      const destination = await this.signImageDeletion(
        this.toPublicID(url),
        scope.type,
      );
      await this.deleteFromCloudinary(destination);
      Toasts.success("Your image has been deleted");
      return image;
    } catch (error) {
      if (resolvedImage) {
        void this.restoreImageReference(resolvedImage.url, scope);
      }
      this.toastError();
    }
  }

  public static async deleteDocument(
    file: GradiumDocument,
    scope: CloudinaryDocumentScope,
  ) {
    const { id, url } = file;
    if (!id) {
      return;
    }
    let resolvedDocument: GradiumDocument | undefined;
    try {
      resolvedDocument = await this.deleteDocumentReference(id, scope.type);
      const destination = await this.signDocumentDeletion(
        this.toPublicID(url),
        scope.type,
      );
      await this.deleteFromCloudinary(destination);
      Toasts.success("Your document has been deleted");
      return file;
    } catch (error) {
      if (resolvedDocument) {
        void this.restoreDocumentReference(
          resolvedDocument.url,
          resolvedDocument.thumbnail,
          scope,
        );
      }
      this.toastError();
    }
  }

  public static async rollBackImageDeletion(
    url: string,
    type: GradiumImageType,
  ) {
    const destination = await this.signImageDeletion(
      this.toPublicID(url),
      type,
    );
    if (!destination) {
      return;
    }
    return this.deleteFromCloudinary(destination);
  }

  public static async rollBackDocumentDeletion(
    url: string,
    type: GradiumDocumentType,
  ) {
    const destination = await this.signDocumentDeletion(
      this.toPublicID(url),
      type,
    );
    if (!destination) {
      return;
    }
    return this.deleteFromCloudinary(destination);
  }

  private static async deleteImageReference(
    id: number,
    type: GradiumImageType,
  ) {
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

  private static async deleteDocumentReference(
    id: number,
    type: GradiumDocumentType,
  ) {
    const response = await graphQLRequest<
      DeleteDocumentMutation,
      DeleteDocumentMutationVariables
    >(deleteDocument, {
      id,
      type,
      propertyId: Properties.getState().current,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.deleteDocument;
  }

  private static async restoreImageReference(
    url: string,
    scope: CloudinaryImageScope,
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
      return response.saveImage;
    } catch (error) {
      // silence
    }
  }

  private static async restoreDocumentReference(
    url: string,
    thumbnail: string,
    scope: CloudinaryDocumentScope,
  ) {
    try {
      const response = await graphQLRequest<
        SaveDocumentMutation,
        SaveDocumentMutationVariables
      >(saveDocument, {
        url,
        thumbnail,
        ...scope,
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
      });
      return response.saveDocument;
    } catch (error) {
      // silence
    }
  }

  private static async signImageDeletion(
    publicId: string,
    imageType: GradiumImageType,
  ) {
    const response = await graphQLRequest<
      GenerateDestroySignatureQuery,
      GenerateDestroySignatureQueryVariables
    >(generateDestroySignature, {
      imageType,
      publicId,
      organizationId: Scope.getState().currentOrganizationId,
    });
    return response.generateDestroySignature;
  }

  private static async signDocumentDeletion(
    publicId: string,
    documentType: GradiumDocumentType,
  ) {
    const response = await graphQLRequest<
      GenerateDestroySignatureQuery,
      GenerateDestroySignatureQueryVariables
    >(generateDestroySignature, {
      documentType,
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
