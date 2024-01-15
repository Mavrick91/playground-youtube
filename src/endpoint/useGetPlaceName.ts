import axios, { AxiosResponse } from 'axios';
import { QueryObserverResult, useQuery } from 'react-query';
import { GeocodingResponse } from '~/types/placeName';

export const useGetPlaceName = (lat: string, lng: string): QueryObserverResult<GeocodingResponse, Error> => useQuery<GeocodingResponse, Error>(
    ['place-name', lat, lng],
    async () => {
      const response: AxiosResponse<GeocodingResponse> = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
      );
      if (response.data.results[0]) {
        return response.data;
      } 
        throw new Error('No results found');
      
    },
    {
      enabled: false,
    }
  );
