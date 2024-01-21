import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
    defaultInitialRegion: null,
  });

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({ timeout: 10000 });
      const updatedLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        defaultInitialRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      };

      setUserLocation(updatedLocation);
    } catch (error) {
      console.error('Error getting location:', error.message);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, getLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
