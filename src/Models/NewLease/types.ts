export interface ILessee {
  name: string;
  email: string;
}

export interface INewLease {
  unit: string;
  end: string;
  start: string;
  rate: string;
  lessees: ILessee[];
}
