'use client';

import { useCallback, useState } from 'react';
import GoogleMap from '~/components/GoogleMap';
import Button from '~/components/shared/Button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '~/components/shared/Dialog';
import { activeFilterButton } from '~/constants/style';
import { useGetPlaceName } from '~/endpoint/useGetPlaceName';
import useQueryParams from '~/hooks/useUpdateQueryParams';
import { FilterLocation } from '~/types/filters';
import CustomLatLng from './CustomLatLng';

const DEFAULT_RADIUS = '1000'; // Meter unit

export default function LocationFilter() {
  const { updateQueryParams, getQueryParam } = useQueryParams({
    deleteQ: true,
  });
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<FilterLocation>({
    id: '',
    label: '',
    lat: '',
    lng: '',
    locationRadius: DEFAULT_RADIUS,
  });
  const { refetch, isFetching } = useGetPlaceName(selectedLocation.lat, selectedLocation.lng);

  const onClickMap = useCallback((lat: string, lng: string, placeName: string = '') => {
    setSelectedLocation(prev => ({
      ...prev,
      lat,
      lng,
      label: placeName,
    }));
  }, []);

  const handleUpdateLocation = (key: string, value: string) => {
    setSelectedLocation(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClickSave = useCallback(async () => {
    try {
      if (!selectedLocation.lat || !selectedLocation.lng) {
        throw new Error('Invalid location coordinates');
      }

      const res = await refetch();

      if (!res.data || !res.data.results || res.data.results.length === 0) {
        throw new Error('Failed to fetch place name');
      }

      updateQueryParams({
        location: `${selectedLocation.lat},${selectedLocation.lng}`,
        locationRadius: selectedLocation.locationRadius,
      });

      setOpen(false);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  }, [refetch, selectedLocation.lat, selectedLocation.lng, selectedLocation.locationRadius, updateQueryParams]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            {...activeFilterButton(!!getQueryParam('location') && !!getQueryParam('locationRadius'))}
          >
            Location
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-7xl">
          <DialogTitle className="text-2xl text-gray-800">Discover videos by location</DialogTitle>
          <p>Select a location on the map or enter coordinates to find videos from that area.</p>

          <div className="flex gap-4">
            <GoogleMap
              onClickMap={onClickMap}
              lat={parseFloat(selectedLocation.lat)}
              lng={parseFloat(selectedLocation.lng)}
              locationRadius={(parseFloat(selectedLocation.locationRadius) || 0) * 1000}
            />
            <div className="w-3/12 flex flex-col justify-between">
              <CustomLatLng selectedLocation={selectedLocation} handleUpdateLocation={handleUpdateLocation} />
              <Button type="submit" disabled={isFetching} onClick={handleClickSave}>
                Save changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
