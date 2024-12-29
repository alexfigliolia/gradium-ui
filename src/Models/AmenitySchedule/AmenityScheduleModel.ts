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
      loading: false,
      filters: false,
      reservations: [],
      reservers: new Set(),
      amenityIds: new Set(),
      openDatePicker: false,
      currentDate: new Date(),
      openNewReservation: false,
      openEditReservation: false,
      openReservationsWarning: false,
      currentReservation: {},
      open: Dates.timeToDate("09:00:00"),
      close: Dates.timeToDate("21:00:00"),
    });
  }

  public resetScope() {
    this.resetFilters();
    this.update(state => {
      state.currentReservation = {};
    });
  }

  public filterByAmenity(ids: Set<number>) {
    this.update(state => {
      state.amenityIds = ids;
    });
    void this.fetchReservations();
  }

  public filterByReserver(ids: Set<number>) {
    this.update(state => {
      state.reservers = ids;
    });
    void this.fetchReservations();
  }

  public resetFilters = () => {
    this.update(state => {
      state.reservers = new Set();
      state.amenityIds = new Set();
    });
  };

  public clearReservers = () => {
    this.update(state => {
      state.reservers = new Set();
    });
  };

  public clearAmenities = () => {
    this.update(state => {
      state.amenityIds = new Set();
    });
  };

  public selectDate(date: Date) {
    this.update(state => {
      state.currentDate = date;
    });
    void this.fetchReservations();
  }

  public async fetchReservations(date = this.getState().currentDate) {
    this.loading(true);
    const { amenityIds, reservers } = this.getState();
    try {
      const response = await graphQLRequest<
        FetchAmenityReservationsQuery,
        FetchAmenityReservationsQueryVariables
      >(fetchAmenityReservations, {
        date: Dates.setTime(date).toISOString(),
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
        amenityIds: amenityIds.size ? Array.from(amenityIds) : undefined,
        reservers: reservers.size ? Array.from(amenityIds) : undefined,
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
    let minOpenDate: Date | undefined;
    let maxCloseDate: Date | undefined;
    for (const { open, close } of amenities) {
      const openDate = new Date(Dates.timeToDate(open));
      const closeDate = new Date(Dates.timeToDate(close));
      if (minOpenDate === undefined || maxCloseDate === undefined) {
        minOpenDate = openDate;
        minOpen = open;
        maxCloseDate = closeDate;
        maxClose = close;
        continue;
      }
      if (openDate < minOpenDate) {
        minOpen = open;
        minOpenDate = openDate;
      }
      if (closeDate > maxCloseDate) {
        maxClose = close;
        maxCloseDate = closeDate;
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

  private openFilters = this.toggleKey("filters", true);
  private closeFilters = this.toggleKey("filters", false);
  private openDatePicker = this.toggleKey("openDatePicker", true);
  private closeDatePicker = this.toggleKey("openDatePicker", false);
  private openReservationsWarning = this.toggleKey(
    "openReservationsWarning",
    true,
  );
  private closeReservationsWarning = this.toggleKey(
    "openReservationsWarning",
    false,
  );
  private openNewReservation = this.toggleKey("openNewReservation", true);
  private closeNewReservation = this.toggleKey("openNewReservation", false);
  private openEditReservation = (reservation: AmenityReservation) => {
    this.update(state => {
      state.openEditReservation = true;
      state.currentReservation = reservation;
    });
  };
  private closeEditReservation = this.toggleKey("openEditReservation", false);

  public filters = this.createToggle(this.openFilters, this.closeFilters);

  public datePicker = this.createToggle(
    this.openDatePicker,
    this.closeDatePicker,
  );
  public newReservation = this.createToggle(
    this.openNewReservation,
    this.closeNewReservation,
  );

  public editReservation = this.createToggle(
    this.openEditReservation,
    this.closeEditReservation,
  );

  public reservationsWarning = this.createToggle(
    this.openReservationsWarning,
    this.closeReservationsWarning,
  );

  public loading(ns: boolean) {
    this.update(state => {
      state.loading = ns;
    });
  }
}
