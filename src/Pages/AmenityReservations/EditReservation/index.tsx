import { memo, useCallback } from "react";
import { updateAmenityReservation } from "GraphQL/Mutations/updateAmenityReservation.gql";
import type {
  UpdateAmenityReservationMutation,
  UpdateAmenityReservationMutationVariables,
} from "GraphQL/Types";
import {
  AmenitySchedule,
  editReservation,
  selectCurrentReservation,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import type { CRFormData } from "../ConfigureReservation";
import { ConfigureReservation } from "../ConfigureReservation";

export const EditReservation = memo(
  function EditReservation(_: Propless) {
    const open = useAmenitySchedule(editReservation);
    const { id, end, start, person, amenity } = useAmenitySchedule(
      selectCurrentReservation,
    );

    const configureMutation = useCallback(
      (data: CRFormData) => ({
        mutation: updateAmenityReservation,
        variables: { ...data, id: id as number },
        onSuccess: (response: UpdateAmenityReservationMutation) => {
          AmenitySchedule.updateReservationByID(
            response.updateAmenityReservation,
          );
        },
      }),
      [id],
    );

    return (
      <ConfigureReservation<
        UpdateAmenityReservationMutation,
        UpdateAmenityReservationMutationVariables
      >
        id={id}
        cancellable
        open={open}
        defaultEnd={end}
        defaultStart={start}
        title="Edit Reservation"
        configureMutation={configureMutation}
        defaultReserver={person?.id?.toString()}
        defaultAmenity={amenity?.id?.toString()}
        close={AmenitySchedule.editReservation.close}
        successMessage="Your reservation has been updated"
      />
    );
  },
  () => true,
);
