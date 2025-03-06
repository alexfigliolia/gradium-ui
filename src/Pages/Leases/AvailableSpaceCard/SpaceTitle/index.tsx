import type { OptionalChildren } from "Types/React";
import "./styles.scss";

export const SpaceTitle = ({ propertyName, spaceName, children }: Props) => {
  return (
    <div className="space-title">
      <div>
        <p>{propertyName}</p>
        <span>{children}</span>
      </div>
      <h3>{spaceName}</h3>
    </div>
  );
};

interface Props extends OptionalChildren {
  propertyName: string;
  spaceName: string;
}
