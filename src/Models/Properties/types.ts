export interface IProperty {
  id: number;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  images: string[];
  mapsLink: string;
  rentableSpaces: number;
  occupancyRate: number;
}

export interface IProperties {
  properties: Record<number, IProperty>;
}
