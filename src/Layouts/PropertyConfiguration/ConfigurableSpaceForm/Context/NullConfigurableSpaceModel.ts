import { ConfigurableSpaceModel } from "Generics/ConfigurableSpaceModel";
import { GradiumImageType } from "GraphQL/Types";
import type { IConfigurableSpace } from "Types/Gradium";

export class NullConfigurableSpaceModel extends ConfigurableSpaceModel<IConfigurableSpace> {
  public IMAGE_TYPE = GradiumImageType.LivingSpaceImage;
  public FLOOR_PLAN_TYPE = GradiumImageType.LivingSpaceFloorPlan;

  public async fetch() {}

  public async save(..._args: any[]) {}

  public async saveBeforeUnmount(..._args: any[]) {}

  public async deleteItem(..._args: any[]) {}

  public validate(_item?: IConfigurableSpace) {
    return false;
  }

  public get blank() {
    return {
      id: -1,
      name: "",
      images: [],
      floorPlans: [],
    };
  }
}
