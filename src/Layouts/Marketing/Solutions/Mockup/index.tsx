import { memo } from "react";
import { BorderTile } from "Components/BorderTile";
import { Iphone } from "Components/Iphone";
import "./styles.scss";

export const Mockup = memo(function Mockup() {
  return (
    <BorderTile className="mockup">
      <Iphone />
    </BorderTile>
  );
});
