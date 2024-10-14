import { Fragment, memo, useCallback } from "react";
import type { ModalToggle } from "@figliolia/modal-stack";
import { Info } from "Icons/Info";
import "./styles.scss";

export const InfoLabel = memo(function InfoLabel({ label, modal }: Props) {
  const onClick = useCallback(() => {
    modal.open();
  }, [modal]);
  return (
    <Fragment>
      {label}
      <button
        onClick={onClick}
        aria-label="More Info"
        type="button"
        className="popover-button">
        <Info aria-hidden />
      </button>
    </Fragment>
  );
});

interface Props {
  label: string;
  modal: ModalToggle;
}
