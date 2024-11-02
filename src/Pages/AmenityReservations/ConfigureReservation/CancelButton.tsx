import { memo, useCallback } from "react";
import { useLoadingState } from "@figliolia/react-hooks";
import { ActionButton } from "Components/ActionButton";
import { cancelAmenityReservation } from "GraphQL/Mutations/cancelAmenityReservation.gql";
import type {
  CancelAmenityReservationMutation,
  CancelAmenityReservationMutationVariables,
} from "GraphQL/Types";
import { UIClient } from "GraphQL/UIClient";
import { AmenitySchedule } from "State/AmenitySchedule";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import type { Callback } from "Types/Generics";

export const CancelButton = memo(function CancelButton({
  id,
  closeAndReset,
}: Props) {
  const { loading, error, success, setState } = useLoadingState();

  const onClick = useCallback(() => {
    const client = new UIClient({
      setState,
      successMessage: "Your reservation has been cancelled",
    });
    void client
      .executeQuery<
        CancelAmenityReservationMutation,
        CancelAmenityReservationMutationVariables
      >(
        cancelAmenityReservation,
        {
          id,
          organizationId: Scope.getState().currentOrganizationId,
          propertyId: Properties.getState().current,
        },
        closeAndReset,
      )
      .then(response => {
        AmenitySchedule.deleteByID(response.cancelAmenityReservation);
      })
      .catch(() => {});
  }, [id, setState, closeAndReset]);

  return (
    <ActionButton
      loading={loading}
      error={!!error}
      success={success}
      type="button"
      className="cancel"
      onClick={onClick}>
      Cancel Reservation
    </ActionButton>
  );
});

interface Props {
  id: number;
  closeAndReset: Callback;
}
