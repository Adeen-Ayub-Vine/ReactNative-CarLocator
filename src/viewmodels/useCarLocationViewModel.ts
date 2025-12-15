import { useEffect, useState } from "react";
import { CarLocation } from "../models/CarLocation";
import { getCurrentLocation } from "../services/locationService";
import {
  getAllLocations,
  saveLocation,
  deleteLocation,
} from "../services/storageService";
import { navigateTo } from "../services/navigationService";
import { generateId } from "../utils/uuid";

export function useCarLocationsViewModel() {
  const [locations, setLocations] = useState<CarLocation[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadLocations() {
    const data = await getAllLocations();
    setLocations(data);
  }

  useEffect(() => {
    loadLocations();
  }, []);

  async function addLocation() {
    setLoading(true);

    const coords = await getCurrentLocation();

    const entry: CarLocation = {
      id: generateId(),
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp: Date.now(),
    };

    await saveLocation(entry);
    await loadLocations();
    setLoading(false);
  }

  async function removeLocation(id: string) {
    await deleteLocation(id);
    await loadLocations();
  }

  function navigate(location: CarLocation) {
    navigateTo(location.latitude, location.longitude);
  }

  return {
    locations,
    loading,
    addLocation,
    removeLocation,
    navigate,
  };
}
