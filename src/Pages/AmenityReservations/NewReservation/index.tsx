import { memo, useCallback, useEffect, useRef } from "react";
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
import type { Callback } from "Types/Generics";
import type { Propless } from "Types/React";
import type { CRFormData } from "../ConfigureReservation";
import { ConfigureReservation } from "../ConfigureReservation";

export const NewReservation = memo(
  function NewReservation(_: Propless) {
    const resetForm = useRef<Callback>(null);
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

    useEffect(() => {
      if (!open && resetForm.current) {
        resetForm.current();
      }
    }, [open]);

    return (
      <ConfigureReservation<
        CreateAmenityReservationMutation,
        CreateAmenityReservationMutationVariables
      >
        open={open}
        ref={resetForm}
        title="New Reservation"
        configureMutation={configureMutation}
        close={AmenitySchedule.newReservation.close}
        successMessage="Your reservation has been created"
      />
    );
  },
  () => true,
);
