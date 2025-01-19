import { DataLoader } from "Generics/DataLoader";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import type { Callback } from "Types/Generics";
import { Authentication } from "./Authentication";
import { GradiumRedirect } from "./GradiumRedirect";

export class AppLoaders {
  private static readonly register = new Map<string, DataLoader<any>>();

  public static create<T>(name: string, callback: () => Promise<T>) {
    const instance = new DataLoader(callback);
    this.register.set(name, instance);
    return instance;
  }

  public static get(name: string) {
    const loader = this.register.get(name);
    if (!loader) {
      throw new Error(`A loader with the name '${name}' was not found`);
    }
    return loader;
  }

  public static resetAll() {
    for (const [_, loader] of this.register) {
      loader.reset();
    }
  }

  public static subscribe(name: string, callback: Callback) {
    return this.get(name).register(callback);
  }

  public static unsubscribe(name: string, ID: string) {
    return this.get(name).remove(ID);
  }

  public static Auth = this.create("auth", async () => {
    return Authentication.isAuthenticated();
  });

  public static Scope = this.create("scope", async () => {
    const authenticated = await this.Auth.get();
    if (!authenticated) {
      return GradiumRedirect.dispatch("/register/login");
    }
    const scope = await Scope.initialize();
    if (scope.affiliations.length) {
      return scope;
    }
    Toasts.toast({
      type: "error",
      duration: 15000,
      message:
        "Your user account is not associated with any Gradium organizations. This could mean you've been removed from your organization. If you believe this to be a mistake, please contact us or your organization's administractor",
    });
    GradiumRedirect.dispatch("/register/login");
  });

  public static Properties = this.create("properties", async () => {
    Properties.loading(true);
    const scope = await this.Scope.get();
    if (!scope) {
      return;
    }
    try {
      const properties = await Properties.initialize(
        scope.currentOrganizationId,
        scope.currentPermissions,
      );
      return properties;
    } finally {
      Properties.loading(false);
    }
  });
}
