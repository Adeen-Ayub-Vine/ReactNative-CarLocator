import { View, Text, Pressable, FlatList } from "react-native";
import { useCarLocationsViewModel } from "../src/viewmodels/useCarLocationViewModel";

export default function HomeScreen() {
  const { locations, loading, addLocation, removeLocation, navigate } =
    useCarLocationsViewModel();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f7f7f7" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          marginBottom: 16,
          marginTop: 50,
        }}
      >
        🚗 Car Parking Locator
      </Text>

      <Pressable
        onPress={addLocation}
        disabled={loading}
        style={{
          backgroundColor: "#2563eb",
          padding: 16,
          borderRadius: 10,
          alignItems: "center",
          opacity: loading ? 0.6 : 1,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
          {loading ? "Saving location…" : "Save Car Location"}
        </Text>
      </Pressable>

      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 14,
              borderRadius: 10,
              marginBottom: 12,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 14, marginBottom: 8 }}>
              📍 {new Date(item.timestamp).toLocaleString()}
            </Text>

            <Pressable
              onPress={() => navigate(item)}
              style={{
                backgroundColor: "#16a34a",
                padding: 10,
                borderRadius: 8,
                marginBottom: 6,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Navigate to Car
              </Text>
            </Pressable>

            <Pressable
              onPress={() => removeLocation(item.id)}
              style={{
                backgroundColor: "#dc2626",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
