import * as Linking from "expo-linking";
import { Platform } from "react-native";

export function navigateTo(lat: number, lng: number) {
  const url =
    Platform.OS === "ios"
      ? `http://maps.apple.com/?daddr=${lat},${lng}`
      : `google.navigation:q=${lat},${lng}`;

  Linking.openURL(url);
}
