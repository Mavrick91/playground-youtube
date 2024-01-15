interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Geometry {
  bounds: Viewport;
  location: Location;
  location_type: string;
  viewport: Viewport;
}

interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface GeocodingResponse {
  plus_code: PlusCode;
  results: Result[];
  status: string;
}
