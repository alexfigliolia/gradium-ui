import { Bath } from "Icons/Bath";
import { Bed } from "Icons/Bed";
import "./styles.scss";

export const BedsBaths = ({ beds, baths }: Props) => {
  return (
    <div className="beds-baths">
      <div>
        <span>{beds}</span>
        <Bed />
      </div>
      <div>
        <span>{baths}</span>
        <Bath />
      </div>
    </div>
  );
};

interface Props {
  beds: number;
  baths: number;
}
