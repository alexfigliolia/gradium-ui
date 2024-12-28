import type { ILoadingStateSetter } from "@figliolia/react-hooks";
import { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import { GradiumImageType } from "GraphQL/Types";
import type { IConfigurableSpace } from "Types/Gradium";

export class NullConfigurableSpaceModel extends ConfigurableSpaceModel<IConfigurableSpace> {
  private readonly NULL_ITEM = {
    id: Infinity,
    ...this.blankItem(),
  };
  public readonly IMAGE_TYPE = GradiumImageType.LivingSpaceImage;
  public readonly FLOOR_PLAN_TYPE = GradiumImageType.LivingSpaceFloorPlan;

  protected fetchSpaces() {
    return Promise.resolve().then(() => [this.NULL_ITEM]);
  }

  public async saveSpace(
    _space: IConfigurableSpace | Omit<IConfigurableSpace, "id">,
    _setState: ILoadingStateSetter,
  ) {
    return Promise.resolve().then(() => this.NULL_ITEM);
  }

  public async deleteTransaction(
    ..._args: Parameters<ConfigurableSpaceModel["deleteTransaction"]>
  ) {
    return Promise.resolve().then(() => this.NULL_ITEM);
  }

  public validate(_item?: IConfigurableSpace) {
    return false;
  }

  public blankItem() {
    return {
      name: "",
      dummy: true,
      images: [],
      floorPlans: [],
    };
  }
}
