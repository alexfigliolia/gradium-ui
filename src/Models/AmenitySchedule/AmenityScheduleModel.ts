import { differenceInMilliseconds } from "date-fns";
import { fetchAmenityReservations } from "GraphQL/Queries/fetchAmenityReservations.gql";
import { graphQLRequest } from "GraphQL/request";
import type {
  AmenityReservation,
  FetchAmenityReservationsQuery,
  FetchAmenityReservationsQueryVariables,
} from "GraphQL/Types";
import { PropertyScopeModel } from "Models/PropertyScopeModel";
import { Amenities } from "State/Amenities";
import { Properties } from "State/Properties";
import { Scope } from "State/Scope";
import { Toasts } from "State/Toasts";
import { Dates } from "Tools/Dates";
import { EnhancedSet } from "Tools/EnhancedSet";
import type { IAmenitySchedule } from "./types";

export class AmenityScheduleModel extends PropertyScopeModel<IAmenitySchedule> {
  constructor() {
    super("Amenity Schedule", {
      loading: false,
      filters: false,
      reservations: [],
      reservers: new EnhancedSet(),
      amenityIds: new EnhancedSet(),
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

  public filterByAmenity(ids: EnhancedSet<number>) {
    this.update(state => {
      state.amenityIds = ids;
    });
  }

  public filterByReserver(ids: EnhancedSet<number>) {
    this.update(state => {
      state.reservers = ids;
    });
  }

  public readonly resetFilters = () => {
    this.update(state => {
      state.reservers = new EnhancedSet();
      state.amenityIds = new EnhancedSet();
    });
  };

  public readonly clearReservers = () => {
    this.update(state => {
      state.reservers = new EnhancedSet();
    });
  };

  public readonly clearAmenities = () => {
    this.update(state => {
      state.amenityIds = new EnhancedSet();
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
    try {
      const response = await graphQLRequest<
        FetchAmenityReservationsQuery,
        FetchAmenityReservationsQueryVariables
      >(fetchAmenityReservations, {
        date: Dates.setTime(date).toISOString(),
        propertyId: Properties.getState().current,
        organizationId: Scope.getState().currentOrganizationId,
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

  public resolveScope() {
    let minOpen = "";
    let maxClose = "";
    let minOpenDate: Date | undefined;
    let maxCloseDate: Date | undefined;
    const { amenityIds } = this.getState();
    const amenities = Amenities.toList();
    const whiteList = amenityIds.size
      ? amenities.filter(a => amenityIds.has(a.id))
      : amenities;
    for (const { open, close } of whiteList) {
      const difference = Math.abs(differenceInMilliseconds(open, close));
      const openDate = new Date(Dates.timeToDate(open));
      const closeDate = new Date(openDate.getTime() + difference);
      if (minOpenDate === undefined || maxCloseDate === undefined) {
        minOpenDate = openDate;
        minOpen = openDate.toISOString();
        maxCloseDate = closeDate;
        maxClose = closeDate.toISOString();
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

  private readonly openFilters = this.toggleKey("filters", true);
  private readonly closeFilters = this.toggleKey("filters", false);
  private readonly openDatePicker = this.toggleKey("openDatePicker", true);
  private readonly closeDatePicker = this.toggleKey("openDatePicker", false);
  private readonly openReservationsWarning = this.toggleKey(
    "openReservationsWarning",
    true,
  );
  private readonly closeReservationsWarning = this.toggleKey(
    "openReservationsWarning",
    false,
  );
  private readonly openNewReservation = this.toggleKey(
    "openNewReservation",
    true,
  );
  private readonly closeNewReservation = this.toggleKey(
    "openNewReservation",
    false,
  );
  private readonly openEditReservation = (reservation: AmenityReservation) => {
    this.update(state => {
      state.openEditReservation = true;
      state.currentReservation = reservation;
    });
  };
  private readonly closeEditReservation = this.toggleKey(
    "openEditReservation",
    false,
  );

  public readonly filters = this.createToggle(
    this.openFilters,
    this.closeFilters,
  );

  public readonly datePicker = this.createToggle(
    this.openDatePicker,
    this.closeDatePicker,
  );
  public readonly newReservation = this.createToggle(
    this.openNewReservation,
    this.closeNewReservation,
  );

  public readonly editReservation = this.createToggle(
    this.openEditReservation,
    this.closeEditReservation,
  );

  public readonly reservationsWarning = this.createToggle(
    this.openReservationsWarning,
    this.closeReservationsWarning,
  );

  public loading(ns: boolean) {
    this.update(state => {
      state.loading = ns;
    });
  }

  public override closeAll() {
    super.closeAll();
    this.update(state => {
      state.currentReservation = {};
    });
  }
}
