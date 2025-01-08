import { DataLoader } from "Generics/DataLoader";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import { Authentication } from "./Authentication";
import { GradiumRedirect } from "./GradiumRedirect";

export class AppLoaders {
  private static readonly register = new Set<DataLoader<any>>();

  public static create<T>(callback: () => Promise<T>) {
    const instance = new DataLoader(callback);
    this.register.add(instance);
    return instance;
  }

  public static resetAll() {
    for (const loader of this.register) {
      loader.reset();
    }
  }

  public static Auth = this.create(async () => {
    return Authentication.isAuthenticated();
  });

  public static Scope = this.create(async () => {
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

  public static Properties = this.create(async () => {
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
