import { memo } from "react";
import { BorderTile } from "Components/BorderTile";
import { SplitText } from "Components/SplitText";
import "./styles.scss";

export const Tile = memo(function Tile({ title, subtitle }: Props) {
  return (
    <BorderTile className="marketing-tile">
      <div>
        <SplitText
          Tag="h2"
          text={title}
          styleFn={i => ({
            transition: `translate 0.3s ${i * 20}ms`,
          })}
        />
        <SplitText
          aria-hidden
          Tag="h2"
          text={title}
          styleFn={i => ({
            transition: `translate 0.3s ${i * 20}ms`,
          })}
        />
      </div>
      <p>{subtitle}</p>
    </BorderTile>
  );
});

interface Props {
  title: string;
  subtitle: string;
}
