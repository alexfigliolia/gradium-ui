import type { ChangeEvent, ReactNode } from "react";
import { memo } from "react";
import { Uploader } from "Components/Uploader";
import type { Callback } from "Types/Generics";

export const SpaceUploader = memo(function SpaceUploader({
  editing,
  onUpload,
  children,
}: Props) {
  return (
    <Uploader
      multiple
      accept="image/*"
      disabled={!editing}
      readOnly={!editing}
      onChange={onUpload}>
      {children}
    </Uploader>
  );
});

interface Props {
  editing: boolean;
  children: ReactNode;
  onUpload?: Callback<[ChangeEvent<HTMLInputElement>]>;
}
