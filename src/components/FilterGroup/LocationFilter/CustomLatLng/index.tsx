import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { Slider } from '~/components/shared/Slider';
import { Input } from '~/components/shared/input/InputText';

type Props = {
  selectedLocation: {
    lat: string;
    lng: string;
    radius: string;
  };
  handleUpdateLocation: (key: string, value: string) => void;
};

export default function CustomLatLng({ selectedLocation, handleUpdateLocation }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="font-bold text-sm text-gray-700">Latitude</Label>
      <Input
        placeholder="Latitude"
        value={selectedLocation.lat}
        onChange={e => {
          handleUpdateLocation('lat', e.target.value);
        }}
      />
      <Label className="font-bold text-sm text-gray-700">Longitude</Label>
      <Input
        placeholder="Longitude"
        className="mb-2"
        value={selectedLocation.lng}
        onChange={e => {
          handleUpdateLocation('lng', e.target.value);
        }}
      />
      <Label className="font-bold text-sm text-gray-700">Radius</Label>
      <Slider
        onValueChange={value => handleUpdateLocation('radius', value[0].toString())}
        max={1000}
        value={[parseFloat(selectedLocation.radius)]}
        step={50}
        defaultValue={[parseFloat(selectedLocation.radius)]}
      />
      <Input
        data-testid="radius-input"
        type="number"
        max={1000}
        className="w-3/6 ml-auto"
        value={selectedLocation.radius}
        onChange={e => handleUpdateLocation('radius', e.target.value)}
      />
    </div>
  );
}
