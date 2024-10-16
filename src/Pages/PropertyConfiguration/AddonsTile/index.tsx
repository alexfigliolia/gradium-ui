import { Fragment, memo, useCallback, useState } from "react";
import {
  useController,
  useDebouncer,
  useLoadingState,
} from "@figliolia/react-hooks";
import { CheckBoxGroup } from "Components/CheckBoxGroup";
import { ColoredActionButton } from "Components/ColoredActionButton";
import { Tile } from "Components/Tile";
import type { PropertyAddonType } from "GraphQL/Types";
import { PuzzlePiece } from "Icons/PuzzlePiece";
import {
  currentAddons,
  currentProperty,
  useProperties,
} from "State/Properties";
import type { Propless } from "Types/React";
import { Controller } from "./Controller";
import { OPTIONS } from "./Options";
import "./styles.scss";

export const AddonsTile = memo(function AddonsTile(_: Propless) {
  const addons = useProperties(currentAddons);
  const { name } = useProperties(currentProperty);
  const [selections, setSelections] = useState(addons);
  const { loading, success, error, setState } = useLoadingState();
  const controller = useController(new Controller(setState));
  const debouncer = useDebouncer(controller.synchronize, 2000);

  const onChange = useCallback(
    (set: Set<string>) => {
      setState("loading", true);
      const newSelections = set as Set<PropertyAddonType>;
      setSelections(newSelections);
      void debouncer.execute(addons, newSelections);
    },
    [addons, debouncer, setState],
  );

  return (
    <Tile TagName="div" className="addon-selection">
      <h2>
        <PuzzlePiece />
        Addons
      </h2>
      <p>
        <span>Addons</span> are a way to customize the <span>Gradium</span> app
        for each of your properties. Simply select the addons you want to use
        and they&apos;ll show at the top of this page.
      </p>
      <p>
        Your residents will also have their own view of the addons you select in
        the <span>Resident App</span>
      </p>
      <CheckBoxGroup
        value={selections}
        options={OPTIONS}
        onChange={onChange}
        label={
          <Fragment>
            Select addons for {name}:{" "}
            <ColoredActionButton
              aria-hidden
              tabIndex={-1}
              error={!!error}
              loading={loading}
              success={success}
            />
          </Fragment>
        }
      />
    </Tile>
  );
});
