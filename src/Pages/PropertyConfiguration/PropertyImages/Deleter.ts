import { deletePropertyImage } from "GraphQL/Mutations/deletePropertyImage.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  CloudinarySignature,
  DeletePropertyImageMutation,
  DeletePropertyImageMutationVariables,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";

export class Deleter {
  private sign: () => Promise<CloudinarySignature>;
  constructor(sign: () => Promise<CloudinarySignature>) {
    this.sign = sign;
  }

  public async delete(index: number) {
    const { properties, current } = Properties.getState();
    const { images } = properties[current];
    const { id, url } = images[index];
    if (!id) {
      return;
    }
    const destination = await this.generateSignature();
    if (!destination) {
      return;
    }
    try {
      await this.deleteFromCloudinary(url, destination);
      await graphQLRequest<
        DeletePropertyImageMutation,
        DeletePropertyImageMutationVariables
      >(deletePropertyImage, {
        id,
        organizationId: Scope.getState().currentOrganizationId,
      });
      Toasts.success("Your property image has been deleted");
    } catch (error) {
      this.toastError();
    }
  }

  private async deleteFromCloudinary(
    url: string,
    destination: CloudinarySignature,
  ) {
    const { name: _1, __typename: _2, ...rest } = destination;
    const data = new FormData();
    for (const K in rest) {
      const key = K as keyof Omit<CloudinarySignature, "__typename" | "name">;
      data.append(key, rest[key].toString());
    }
    data.append("invalidate", "true");
    data.append("public_id", this.toPublicID(url));
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${destination.name}/image/destroy`,
      {
        method: "POST",
        body: data,
      },
    );
    if (!response.ok) {
      throw "Failed at cloudinary";
    }
    return response;
  }

  private async generateSignature() {
    try {
      const destination = await this.sign();
      return destination;
    } catch (error) {
      this.toastError();
    }
  }

  private toastError() {
    Toasts.error(
      "Something went wrong while deleting your image. Please try again",
    );
  }

  private toPublicID(url: string) {
    const tokens = url.split("/").slice(-3);
    const file = tokens
      .pop()!
      .replace(/([^.]+$)/, "")
      .slice(0, -1);
    tokens.push(file);
    return tokens.join("/");
  }
}
