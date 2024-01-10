'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Autocomplete } from '@react-google-maps/api';
import { Input } from '../shared/input/InputText';
import Button from '../shared/Button';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY as string,
  version: 'weekly',
  libraries: ['places'],
});

const mapOptions: google.maps.MapOptions = {
  center: {
    lat: 0,
    lng: 0,
  },
  zoom: 2,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

type Props = {
  onClickMap: (lat: string, lng: string, placeName?: string) => void;
  radius: number;
  lat: number;
  lng: number;
};

export default function GoogleMap({ onClickMap, lat, lng, radius }: Props) {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const [containerAutocompleteRef, setContainerAutocompleteRef] =
    useState<HTMLDivElement | null>(null);

  const deleteMarker = () => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
  };

  const deleteCircle = () => {
    if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }
  };

  useEffect(() => {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        if (mutation.addedNodes.length) {
          const hasNewNode = Array.from(mutation.addedNodes).some(
            (node: any) => {
              return node.className === 'pac-container pac-logo hdpi';
            }
          );

          if (hasNewNode && containerAutocompleteRef) {
            Array.from(
              document.getElementsByClassName('pac-container pac-logo hdpi')
            ).forEach(element => {
              (element as HTMLElement).classList.add('pac-container-custom');
              containerAutocompleteRef.append(element);
            });
            observer.disconnect();
          }
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [containerAutocompleteRef, isMapLoaded]);

  useEffect(() => {
    return () => {
      Array.from(
        document.getElementsByClassName('pac-container pac-logo hdpi')
      ).forEach(element => {
        element.remove();
      });
    };
  }, []);

  const resetZoom = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapOptions.zoom as number);
    }
  };

  const centerMap = useCallback(
    (lat: number, lng: number) => {
      if (mapRef.current) {
        const center = new google.maps.LatLng(lat, lng);
        mapRef.current.setCenter(center);

        const bounds = new google.maps.LatLngBounds();

        const latRadian = lat * (Math.PI / 180);
        const degLatKm = 110.574235;
        const degLongKm = 110.572833 * Math.cos(latRadian);
        const deltaLat = radius / 1000.0 / degLatKm;
        const deltaLong = radius / 1000.0 / degLongKm;

        const minLat = lat - deltaLat;
        const minLong = lng - deltaLong;
        const maxLat = lat + deltaLat;
        const maxLong = lng + deltaLong;

        bounds.extend(new google.maps.LatLng(minLat, minLong));
        bounds.extend(new google.maps.LatLng(maxLat, maxLong));

        mapRef.current.fitBounds(bounds);
      }
    },
    [radius]
  );

  const createMarkerAndCircle = useCallback(
    (lat: number, lng: number) => {
      deleteMarker();
      deleteCircle();

      const marker = new google.maps.Marker({
        position: {
          lat,
          lng,
        },
        map: mapRef.current,
        draggable: true,
      });

      const circle = new google.maps.Circle({
        center: {
          lat,
          lng,
        },
        radius,
        map: mapRef.current,
        strokeColor: '#ab39ff',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ab39ff',
        fillOpacity: 0.15,
      });

      marker.addListener('dragend', (event: any) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();

        onClickMap(newLat.toString(), newLng.toString());
        createMarkerAndCircle(newLat, newLng);
        setAutocompleteValue('');
      });

      circleRef.current = circle;
      markerRef.current = marker;
    },
    // don't pass radius as dependency because it will cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClickMap]
  );

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(radius);
    }
  }, [radius, lat, lng]);

  useEffect(() => {
    loader
      .load()
      .then(google => {
        mapRef.current = new google.maps.Map(
          document.getElementById('map')!,
          mapOptions
        );

        setIsMapLoaded(true);
      })
      .catch(e => {
        console.log(e.message);
      });
  }, []);

  useEffect(() => {
    if (mapRef.current && isMapLoaded) {
      mapRef.current.addListener('click', (e: any) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        onClickMap(lat.toString(), lng.toString());
        createMarkerAndCircle(lat, lng);
        setAutocompleteValue('');
      });
    }
  }, [createMarkerAndCircle, isMapLoaded, onClickMap]);

  useEffect(() => {
    if (mapRef.current && isMapLoaded && lat && lng) {
      createMarkerAndCircle(lat, lng);
    }
  }, [createMarkerAndCircle, isMapLoaded, lat, lng]);

  return (
    <div className="h-[700px] w-9/12">
      <div data-testid="map" id="map" className="h-full">
        {isMapLoaded && (
          <Autocomplete
            onLoad={autocomplete => {
              setAutocomplete(autocomplete);
            }}
            onPlaceChanged={() => {
              if (autocomplete !== null) {
                const place = autocomplete.getPlace();
                const location = place.geometry?.location;
                if (location) {
                  const lat = location.lat();
                  const lng = location.lng();

                  setAutocompleteValue(place.formatted_address || '');
                  onClickMap(
                    lat.toString(),
                    lng.toString(),
                    place.formatted_address
                  );
                  centerMap(lat, lng);
                }
              }
            }}
          >
            <div
              ref={node => setContainerAutocompleteRef(node)}
              className="relative top-2.5 left-2.5 h-10 border w-72"
            >
              <Input
                className="absolute inset-0 rounded-none w-72"
                placeholder="Search location"
                value={autocompleteValue}
                onChange={e => setAutocompleteValue(e.target.value)}
              />
              {!!lat && !!lng && (
                <div className="absolute top-0 left-80 z-10 flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => centerMap(lat, lng)}
                  >
                    Center
                  </Button>
                  <Button variant="secondary" onClick={resetZoom}>
                    Full map
                  </Button>
                </div>
              )}
            </div>
          </Autocomplete>
        )}
      </div>
    </div>
  );
}
