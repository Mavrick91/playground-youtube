export type FilterCategory = {
  id: string;
  label: string;
  subcategories?: FilterCategory[];
};

export type FilterCountry = {
  id: string;
  label: string;
};

export type FilterLocation = {
  id: string;
  label: string;
  lat: string;
  lng: string;
  radius: string;
};

export type Filters = FilterCategory | FilterCountry | FilterLocation;

export type OptionsQueryParams = {
  baseURL?: string;
  deleteQ?: boolean;
  deleteFilters?: boolean;
} 
