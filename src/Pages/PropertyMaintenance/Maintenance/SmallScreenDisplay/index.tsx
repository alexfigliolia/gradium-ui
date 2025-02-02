import { memo } from "react";
import type { FlickityOptions, ISliderChild } from "Components/TouchSlider";
import { DEFAULT_OPTIONS, TouchSlider } from "Components/TouchSlider";
import { DisplayController } from "Pages/PropertyMaintenance/DisplayController";
import type { Propless } from "Types/React";
import { Column } from "../Column";
import "./styles.scss";

const COLUMNS: ISliderChild[] = DisplayController.statuses.map(status => ({
  type: "child",
  content: <Column key={status} status={status} />,
}));

const OPTIONS: FlickityOptions = {
  ...DEFAULT_OPTIONS,
  cellAlign: "left",
  setGallerySize: true,
  adaptiveHeight: true,
};

export const SmallScreenDisplay = memo(
  function SmallScreenDisplay(_: Propless) {
    return (
      <div className="scrum-small">
        <TouchSlider images={COLUMNS} options={OPTIONS} />
      </div>
    );
  },
  () => true,
);
