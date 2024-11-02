import { memo, useCallback } from "react";
import { createAmenityReservation } from "GraphQL/Mutations/createAmenityReservation.gql";
import type {
  CreateAmenityReservationMutation,
  CreateAmenityReservationMutationVariables,
} from "GraphQL/Types";
import {
  AmenitySchedule,
  newReservation,
  useAmenitySchedule,
} from "State/AmenitySchedule";
import type { Propless } from "Types/React";
import type { CRFormData } from "../ConfigureReservation";
import { ConfigureReservation } from "../ConfigureReservation";

export const NewReservation = memo(
  function NewReservation(_: Propless) {
    const open = useAmenitySchedule(newReservation);

    const configureMutation = useCallback(
      (variables: CRFormData) => ({
        variables,
        mutation: createAmenityReservation,
        onSuccess: (response: CreateAmenityReservationMutation) => {
          AmenitySchedule.addReservation(response.createAmenityReservation);
        },
      }),
      [],
    );

    return (
      <ConfigureReservation<
        CreateAmenityReservationMutation,
        CreateAmenityReservationMutationVariables
      >
        open={open}
        title="New Reservation"
        successMessage="Your reservation has been created"
        configureMutation={configureMutation}
        close={AmenitySchedule.newReservation.close}
      />
    );
  },
  () => true,
);
