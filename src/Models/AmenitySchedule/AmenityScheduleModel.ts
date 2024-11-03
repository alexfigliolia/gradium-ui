import { StackModel } from "Generics/StackModel";
import { fetchAmenityReservations } from "GraphQL/Queries/fetchAmenityReservations.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  Amenity,
  AmenityReservation,
  FetchAmenityReservationsQuery,
  FetchAmenityReservationsQueryVariables,
} from "GraphQL/Types";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import { Dates } from "Tools/Dates";
import type { IAmenitySchedule } from "./types";

export class AmenityScheduleModel extends StackModel<IAmenitySchedule> {
  constructor() {
    super("Amenity Schedule", {
      open: "09:00:00",
      close: "21:00:00",
      loading: false,
      amenityIds: [],
      reservations: [],
      openDatePicker: false,
      currentDate: new Date(),
      openNewReservation: false,
      openEditReservation: false,
      currentReservation: {},
    });
  }

  public selectDate(date: Date) {
    this.update(state => {
      state.currentDate = date;
    });
    void this.fetchReservations();
  }

  public async fetchReservations(date = this.getState().currentDate) {
    this.loading(true);
    const { amenityIds } = this.getState();
    try {
      const response = await graphQLRequest<
        FetchAmenityReservationsQuery,
        FetchAmenityReservationsQueryVariables
      >(fetchAmenityReservations, {
        date: Dates.toDayPreciseISOString(date),
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
        amenityIds: amenityIds.length ? amenityIds : undefined,
      });
      this.update(state => {
        state.reservations = response.fetchAmenityReservations;
      });
    } catch (error) {
      Toasts.error(
        "Something went wrong when fetching this property's amenity reservations. Please refresh the page",
      );
    }
    this.loading(false);
  }

  public addReservation(reservation: AmenityReservation) {
    this.update(state => {
      state.reservations = [...state.reservations, reservation];
    });
  }

  public updateReservationByID(reservation: AmenityReservation) {
    this.update(state => {
      state.reservations = state.reservations.map(current => {
        if (current.id === reservation.id) {
          return reservation;
        }
        return current;
      });
    });
  }

  public deleteByID(id: number) {
    this.update(state => {
      state.reservations = state.reservations.filter(item => item.id !== id);
    });
  }

  public resolveScope(amenities: Amenity[]) {
    let minOpen = "";
    let maxClose = "";
    let minOpenInt = Infinity;
    let maxCloseInt = -Infinity;
    for (const { open, close } of amenities) {
      const openInt = this.toTimeInt(open);
      const closeInt = this.toTimeInt(close);
      if (openInt < minOpenInt) {
        minOpen = open;
        minOpenInt = openInt;
      }
      if (closeInt > maxCloseInt) {
        maxClose = close;
        maxCloseInt = closeInt;
      }
    }
    if (minOpen) {
      this.update(state => {
        state.open = minOpen;
      });
    }
    if (maxClose) {
      this.update(state => {
        state.close = maxClose;
      });
    }
  }

  private toTimeInt(time: string) {
    return parseInt(time.split(":").join(""));
  }

  private openDatePicker = this.toggleKey("openDatePicker", true);
  private closeDatePicker = this.toggleKey("openDatePicker", false);
  private openNewReservation = this.toggleKey("openNewReservation", true);
  private closeNewReservation = this.toggleKey("openNewReservation", false);
  private openEditReservation = (reservation: AmenityReservation) => {
    this.update(state => {
      state.openEditReservation = true;
      state.currentReservation = reservation;
    });
  };
  private closeEditReservation = this.toggleKey("openEditReservation", false)

  public datePicker = StackModel.createToggle(
    this.openDatePicker,
    this.closeDatePicker,
  );
  public newReservation = StackModel.createToggle(
    this.openNewReservation,
    this.closeNewReservation,
  );

  public editReservation = StackModel.createToggle(
    this.openEditReservation,
    this.closeEditReservation,
  );

  public loading(ns: boolean) {
    this.update(state => {
      state.loading = ns;
    });
  }
}
