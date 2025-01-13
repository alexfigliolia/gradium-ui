import { memo } from "react";
import { useController, useFormState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { AutoSizeTextArea } from "Components/AutoSizeTextArea";
import { DataViewer } from "Components/DataViewer";
import { Keys } from "Icons/Keys";
import { AttachFiles } from "Pages/PropertyMaintenance/AttachmentList";
import { newProperty, Properties, useProperties } from "State/Properties";
import type { Propless } from "Types/React";
import { Controller } from "./Controller";
import "./styles.scss";

export const NewProperty = memo(
  function NewProperty(_: Propless) {
    const open = useProperties(newProperty);
    const controller = useController(new Controller());
    const { onSubmit, loading, success, error } = useFormState(
      controller.create,
    );
    return (
      <DataViewer
        open={open}
        className="new-property"
        close={Properties.newProperty.close}>
        <form ref={controller.form} onSubmit={onSubmit}>
          <div className="title">
            <Keys />
            <AutoSizeTextArea
              className="h2"
              name="property-name"
              placeholder="New Property Name"
            />
          </div>
          <AutoSizeTextArea
            className="p"
            name="address1"
            placeholder="Address"
          />
          <AutoSizeTextArea
            className="p"
            name="address2"
            placeholder="Address 2"
          />
          <AutoSizeTextArea className="p" name="city" placeholder="City" />
          <div className="splitter">
            <AutoSizeTextArea className="p" name="state" placeholder="State" />
            <AutoSizeTextArea className="p" name="zip" placeholder="Zip Code" />
          </div>
          <h3>Images</h3>
          <AttachFiles ref={controller.uploader} />
          <ActionButton error={!!error} success={success} loading={loading}>
            Create
          </ActionButton>
        </form>
      </DataViewer>
    );
  },
  () => true,
);
