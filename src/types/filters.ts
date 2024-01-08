export type FilterCategory = {
    id: string;
    label: string;
    subcategories?: FilterCategory[];
  };

  export type FilterCountry = {
    id: string;
    label: string;
  };

  export type Filters = FilterCategory | FilterCountry;
  