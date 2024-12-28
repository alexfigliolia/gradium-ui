import { Fragment, memo, useCallback, useContext } from "react";
import type { LivingSpace } from "GraphQL/Types";
import { Area } from "Icons/Area";
import { Bath } from "Icons/Bath";
import { Bed } from "Icons/Bed";
import { Key } from "Icons/Key";
import { Ruler } from "Icons/Ruler";
import type { ICSForm } from "Layouts/PropertyConfiguration";
import {
  ConfigurableSpaceDropDown,
  ConfigurableSpaceInput,
  CSFContext,
} from "Layouts/PropertyConfiguration";
import type { LivingSpacesModel } from "Models/LivingSpaces";
import { PropertyOptions } from "Tools/PropertyOptions";
import type { Propless } from "Types/React";

export const Inputs = memo(
  function Inputs(_: Propless) {
    const { item, controller, editing } = useContext(
      CSFContext,
    ) as unknown as ICSForm<LivingSpace, LivingSpacesModel>;

    const { name, type, beds, baths, size } = item;

    const toFloat = useCallback((value: string) => {
      return parseFloat(value || "0");
    }, []);

    return (
      <Fragment>
        <ConfigurableSpaceInput<LivingSpace>
          type="text"
          label="Name"
          value={name}
          icon={<Key />}
          property="name"
          autoComplete="off"
          disabled={!editing}
          className="name-input"
          onChange={controller.update}
          name={controller.createKey("name", "living-space")}
        />
        <ConfigurableSpaceDropDown<LivingSpace>
          value={type}
          label="Type"
          icon={<Area />}
          fallback="unit"
          property="type"
          disabled={!editing}
          title="Type of Space"
          className="type-dropdown"
          list={PropertyOptions.SPACE_TYPE}
          name={controller.createKey("type", "living-space")}
          onChange={controller.update}
        />
        <ConfigurableSpaceInput<LivingSpace>
          type="number"
          label="Size"
          step="any"
          value={size}
          property="size"
          inputMode="numeric"
          icon={<Ruler />}
          autoComplete="off"
          disabled={!editing}
          className="size-input"
          onChange={controller.update}
          name={controller.createKey("size", "living-space")}>
          <div className="postfix">sqft</div>
        </ConfigurableSpaceInput>
        <ConfigurableSpaceDropDown<LivingSpace, "beds", false>
          label="Beds"
          icon={<Bed />}
          property="beds"
          disabled={!editing}
          value={beds.toString()}
          className="beds-dropdown"
          list={PropertyOptions.BEDS}
          transform={toFloat}
          title="Total Bedrooms"
          name={controller.createKey("beds", "living-space")}
          onChange={controller.update}
        />
        <ConfigurableSpaceDropDown<LivingSpace, "baths", false>
          label="Baths"
          icon={<Bath />}
          property="baths"
          disabled={!editing}
          transform={toFloat}
          value={baths.toString()}
          className="baths-dropdown"
          title="Total Bathrooms"
          list={PropertyOptions.BATHS}
          onChange={controller.update}
          name={controller.createKey("baths", "living-space")}
        />
      </Fragment>
    );
  },
  () => true,
);
