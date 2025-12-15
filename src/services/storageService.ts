import AsyncStorage from "@react-native-async-storage/async-storage";
import { CarLocation } from "../models/CarLocation";

const KEY = "CAR_LOCATIONS";

export async function getAllLocations(): Promise<CarLocation[]> {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveLocation(location: CarLocation) {
  const list = await getAllLocations();
  list.push(location);
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}

export async function deleteLocation(id: string) {
  const list = await getAllLocations();
  const updated = list.filter((l) => l.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
}
