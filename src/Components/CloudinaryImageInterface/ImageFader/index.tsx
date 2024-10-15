import { memo } from "react";
import "./styles.scss";

export const ImageFader = memo(function ImageFader({ image }: Props) {
  return (
    <div
      className="fader"
      style={{
        background: `url(${image}) no-repeat center / cover`,
      }}
    />
  );
});

interface Props {
  image: string;
}
