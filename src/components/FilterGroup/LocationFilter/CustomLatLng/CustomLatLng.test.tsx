import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomLatLng from './index';

describe('CustomLatLng', () => {
  it('renders without crashing', () => {
    const handleUpdateLocationMock = jest.fn();
    render(
      <CustomLatLng
        selectedLocation={{ lat: '0', lng: '0', locationRadius: '0' }}
        handleUpdateLocation={handleUpdateLocationMock}
      />
    );

    const latitudeInput = screen.getByPlaceholderText('Latitude');
    const longitudeInput = screen.getByPlaceholderText('Longitude');

    expect(latitudeInput).toBeInTheDocument();
    expect(longitudeInput).toBeInTheDocument();
  });

  it('calls handleUpdateLocation with the new latitude when the latitude input changes', () => {
    const handleUpdateLocationMock = jest.fn();
    render(
      <CustomLatLng
        selectedLocation={{ lat: '0', lng: '0', locationRadius: '0' }}
        handleUpdateLocation={handleUpdateLocationMock}
      />
    );

    const latitudeInput = screen.getByPlaceholderText('Latitude');

    fireEvent.change(latitudeInput, { target: { value: '1' } });

    expect(handleUpdateLocationMock).toHaveBeenCalledWith('lat', '1');
  });

  it('calls handleUpdateLocation with the new longitude when the longitude input changes', () => {
    const handleUpdateLocationMock = jest.fn();
    render(
      <CustomLatLng
        selectedLocation={{ lat: '0', lng: '0', locationRadius: '0' }}
        handleUpdateLocation={handleUpdateLocationMock}
      />
    );

    const longitudeInput = screen.getByPlaceholderText('Longitude');

    fireEvent.change(longitudeInput, { target: { value: '1' } });

    expect(handleUpdateLocationMock).toHaveBeenCalledWith('lng', '1');
  });
});

it('calls handleUpdateLocation with the new radius when the radius input changes', () => {
  const handleUpdateLocationMock = jest.fn();
  render(
    <CustomLatLng
      selectedLocation={{ lat: '0', lng: '0', locationRadius: '0' }}
      handleUpdateLocation={handleUpdateLocationMock}
    />
  );

  const radiusInput = screen.getByTestId('radius-input');

  fireEvent.change(radiusInput, { target: { value: '10' } });

  expect(handleUpdateLocationMock).toHaveBeenCalledWith('locationRadius', '10');
});
