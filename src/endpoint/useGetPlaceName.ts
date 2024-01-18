import { QueryObserverResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { GeocodingResponse } from '~/types/placeName';

export const useGetPlaceName = (lat: string, lng: string): QueryObserverResult<GeocodingResponse, Error> =>
  useQuery({
    queryKey: ['place-name', lat, lng],
    queryFn: async () => {
      const response: AxiosResponse<GeocodingResponse> = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
      );
      if (response.data.results[0]) {
        return response.data;
      }
      throw new Error('No results found');
    },
    enabled: false,
  });
