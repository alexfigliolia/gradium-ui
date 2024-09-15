import { memo } from "react";
import { Confirmation } from "Components/Confirmation";
import { DropDown } from "Components/DropDown";
import { BasketballCourt } from "Icons/BasketballCourt";

const amenities = [
  {
    id: 1,
    name: "Basketball Court",
    price: "10.00",
    open: "10:00:00",
    close: "22:00:00",
    billed: "hour",
    images: [],
    floorPlans: [],
    footage: "1234",
  },
  {
    id: 2,
    name: "Tennis Court",
    price: "10.00",
    open: "10:00:00",
    close: "22:00:00",
    billed: "hour",
    images: [],
    floorPlans: [],
    footage: "1234",
  },
  {
    id: 3,
    name: "Movie Theater",
    price: "10.00",
    open: "10:00:00",
    close: "22:00:00",
    billed: "hour",
    images: [],
    floorPlans: [],
    footage: "1234",
  },
  {
    id: 4,
    name: "Chef's Kitchen",
    price: "10.00",
    open: "10:00:00",
    close: "22:00:00",
    billed: "hour",
    images: [],
    floorPlans: [],
    footage: "1234",
  },
];

export const AmenityReservation = memo(function AmenityReservation() {
  return (
    <Confirmation open={true} close={() => {}}>
      <h2>Create Reservation</h2>
      <p>
        Reservations will be charged to the corresponding unit&apos;s monthly
        fees
      </p>
      <form>
        <DropDown
          required
          label="Space"
          list={amenities.map(a => ({ value: a.id.toString(), label: a.name }))}
          name="living-space"
          icon={<BasketballCourt />}
          value={new Set([""])}
          onChange={() => {}}
        />
      </form>
    </Confirmation>
  );
});
