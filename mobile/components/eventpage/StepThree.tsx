import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

import { Users } from "lucide-react-native";

type Venue = {
  id: number;
  name: string;
  capacity: string;
  description: string;
  image: ImageSourcePropType;
  disabled?: boolean;
};


const venues: Venue[] = [
  {
    id: 1,
    name: "UMak Performing Arts Theater",
    capacity: "Capacity: 1,182 Seats",
    description:
      "The UMak Performing Arts Theater serves as a premier, world-class performance space for the University of Makati and the greater Makati community.",
    image: require("../../../../assets/images/VenueUPAT.jpg"),
    disabled: false,
  },
  {
    id: 2,
    name: "UMak Auditorium",
    capacity: "Capacity: 300 Seats",
    description:
      "The UMak Auditorium serves as a versatile, medium-capacity venue for various events within the university.",
    image: require("../../../../assets/images/VenueAuditorium.jpg"),
    disabled: true, // 🚫 Disable Auditorium
  },
];


type VenueCardProps = {
  venue: Venue;
  isSelected: boolean;
  onSelect: (id: number) => void;
};

const VenueCard = ({ venue, isSelected, onSelect }: VenueCardProps) => (
  <TouchableOpacity
    style={[
      styles.venueCard,
      venue.disabled && { opacity: 0.5 }, // dim disabled card
    ]}
    disabled={venue.disabled} // disable touch
    onPress={() => onSelect(venue.id)}
  >
    <View style={styles.venueImagePlaceholder}>
      <Image
        source={venue.image}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>

    <View style={styles.venueInfo}>
      <View style={styles.venueHeader}>
        <View
          style={[
            styles.radioButton,
            isSelected && !venue.disabled && styles.radioButtonSelected,
            venue.disabled && { borderColor: "#525252" }, // gray border
          ]}
        >
          {isSelected && !venue.disabled && (
            <View style={styles.radioButtonInner} />
          )}
        </View>

        <Text style={styles.venueName}>{venue.name}</Text>
      </View>

      {venue.disabled}

      <View style={styles.venueCapacity}>
        <Users size={16} color="#525252" />
        <Text style={styles.venueCapacityText}>{venue.capacity}</Text>
      </View>

      <Text style={styles.venueDescription}>{venue.description}</Text>
    </View>
  </TouchableOpacity>
);

type StepThreeProps = {
  selectedVenue: number | null;
  setSelectedVenue: (id: number) => void;
};

export default function StepThree({
  selectedVenue,
  setSelectedVenue,
}: StepThreeProps) {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>Event Venue</Text>

      {venues.map((venue) => (
        <VenueCard
          key={venue.id}
          venue={venue}
          isSelected={selectedVenue === venue.id}
          onSelect={setSelectedVenue}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#1C1C1C",
    marginBottom: 8,
  },
  venueCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.3)",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",

    // Drop shadow from Figma settings
    shadowColor: "#1C1C1C",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2, // 20% opacity
    shadowRadius: 4, // corresponds to blur 4
    elevation: 2, // Android shadow
  },
  venueImagePlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  venueInfo: {
    padding: 16,
  },
  venueHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#525252",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    borderColor: "#941418",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#941418",
  },
  venueName: {
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
    color: "#1C1C1C",
    flex: 1,
  },
  venueCapacity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
    marginLeft: 30,
  },
  venueCapacityText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
  },
  venueDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
    marginLeft: 30,
  },
});
