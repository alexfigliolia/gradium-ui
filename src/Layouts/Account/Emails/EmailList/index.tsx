import { memo } from "react";
import type { FlickityOptions } from "Components/ImageSlider";
import { DEFAULT_OPTIONS, ImageSlider } from "Components/ImageSlider";
import { selectEmails, useScope } from "State/Scope";
import { selectWidth, useScreen } from "State/Screen";
import type { Propless } from "Types/React";
import { RegisteredEmail } from "./RegisteredEmail";
import "./styles.scss";

const OPTIONS: FlickityOptions = {
  ...DEFAULT_OPTIONS,
  adaptiveHeight: true,
  setGallerySize: true,
};

export const EmailList = memo(
  function EmailList(_: Propless) {
    const emails = useScope(selectEmails);
    const width = useScreen(selectWidth);
    if (width < 670) {
      return (
        <ImageSlider
          options={OPTIONS}
          className="email-list"
          images={emails.map(({ email }, i) => ({
            type: "child",
            content: <RegisteredEmail key={i} email={email} />,
          }))}
        />
      );
    }
    return (
      <div className="email-list">
        {emails.map(({ email }, i) => {
          return <RegisteredEmail key={i} email={email} />;
        })}
      </div>
    );
  },
  () => true,
);
