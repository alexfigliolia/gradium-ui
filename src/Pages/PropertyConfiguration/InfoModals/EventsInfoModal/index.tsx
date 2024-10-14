import { memo } from "react";
import {
  eventAddonInfo,
  PropertyConfiguration,
  usePropertyConfiguration,
} from "Pages/PropertyConfiguration/State";
import type { Propless } from "Types/React";
import { AddonInfoModal } from "../AddonInfoModal";

export const EventsInfoModal = memo(function EventsInfoModal(_: Propless) {
  const open = usePropertyConfiguration(eventAddonInfo);
  return (
    <AddonInfoModal
      open={open}
      close={PropertyConfiguration.eventAddonInfo.close}>
      <h2>Events Schedule</h2>
      <p>
        This addon is for properties that wish to make visible, events taking
        place on premises. These events can include:
      </p>
      <ul>
        <li>Social Events</li>
        <li>Scheduled Maintenace Work</li>
        <li>Town Meetings</li>
        <li>and more</li>
      </ul>
      <p>
        Residents will have visibility into upcoming and past events, and have
        access to a monthly schedule in the <span>Resident App</span>.
      </p>
      <p>
        They can RSVP, participate virtually, and suggest improvements for
        future events.
      </p>
    </AddonInfoModal>
  );
});
