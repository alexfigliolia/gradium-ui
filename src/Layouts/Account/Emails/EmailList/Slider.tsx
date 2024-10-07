import { memo, useEffect, useRef } from "react";
import { useTimeout } from "@figliolia/react-hooks";
import type { Controller, FlickityOptions } from "Components/ImageSlider";
import { DEFAULT_OPTIONS, ImageSlider } from "Components/ImageSlider";
import { selectEmails, useScope } from "State/Scope";
import type { Propless } from "Types/React";
import { RegisteredEmail } from "./RegisteredEmail";

const OPTIONS: FlickityOptions = {
  ...DEFAULT_OPTIONS,
  adaptiveHeight: true,
  setGallerySize: true,
};

export const Slider = memo(
  function Slider(_: Propless) {
    const timeout = useTimeout();
    const emails = useScope(selectEmails);
    const length = useRef(emails.length);
    const controller = useRef<Controller>(null);

    useEffect(() => {
      if (emails.length > length.current) {
        const N = emails.length - 1;
        timeout.execute(() => {
          if (!controller.current) {
            return;
          }
          controller.current.flickity?.selectCell(N);
        }, 200);
      }
      length.current = emails.length;
    }, [emails.length, timeout]);

    return (
      <ImageSlider
        ref={controller}
        options={OPTIONS}
        className="email-list"
        images={emails.map(({ email }) => ({
          type: "child",
          content: <RegisteredEmail key={email} email={email} />,
        }))}
      />
    );
  },
  () => true,
);
