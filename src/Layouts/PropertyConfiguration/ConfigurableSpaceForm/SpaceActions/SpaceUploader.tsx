import type { ReactNode } from "react";
import { memo } from "react";
import { Uploader } from "Components/Uploader";

export const SpaceUploader = memo(function SpaceUploader({
  editing,
  children,
}: Props) {
  return (
    <Uploader
      multiple
      disabled={!editing}
      readOnly={!editing}
      accept="image/png, image/jpeg, image/jpg, image/avif, image/webp, application/pdf">
      {children}
    </Uploader>
  );
});

interface Props {
  editing: boolean;
  children: ReactNode;
}
