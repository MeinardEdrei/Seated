import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import {
  SectionData,
  FloorSeatsResponse,
  SeatDto,
  SeatGridProps,
} from "@/types/seat-map";

import { SafeAreaView } from "react-native-safe-area-context";

const API_BASE_URL = Constants.expoConfig?.extra?.API_URL + "/api";
// const VENUE_ID = 1;

// Detect device
const useResponsive = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const { width } = dimensions;
  const isWeb = Platform.OS === "web";
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // (To be removed) Determine max columns based on screen size
  const maxColumns = isDesktop ? undefined : isTablet ? 12 : 9;

  return { width, isMobile, isTablet, isDesktop, isWeb, maxColumns };
};

// Main
const SeatMapView = () => {
  const [selectedFloor, setSelectedFloor] = useState<"First" | "Second">(
    "First",
  );
  const [sectionsData, setSectionsData] = useState<SectionData[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number>(0);

  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Fetch seats when floor or screen size changes
  useEffect(() => {
    fetchSeats(selectedFloor);
  }, [selectedFloor, isMobile]);

  // Fetch seats
  const fetchSeats = async (floor: string) => {
    try {
      setLoading(true);
      setError(null);

      let url = `${API_BASE_URL}/seat/by-floor/${floor.toLowerCase()}`;
      if (isMobile || isTablet) {
        url += `?mobile=true`;
      }

      console.log(
        "Fetching from:",
        url,
        isMobile ? "(Mobile view)" : "(Desktop view)",
      );
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: FloorSeatsResponse = await response.json();
      console.log("Received data:", {
        sections: data.sections.length,
        totalSeats: data.metadata.totalSeats,
      });

      setSectionsData(data.sections);
      setCurrentSectionIndex(0);
      setCurrentViewIndex(0);
    } catch (err) {
      console.error("Failed to fetch seats:", err);
      setError(err instanceof Error ? err.message : "Failed to load seats");
    } finally {
      setLoading(false);
    }
  };

  // Seat Selection One Reservation
  const toggleSeatSelection = (seatId: number, status: string) => {
    if (status !== "Available") return;

    setSelectedSeat(seatId);
  };

  const handleReserveSeat = () => {};

  // Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading seat map...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ {error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => fetchSeats(selectedFloor)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // View Config Section
  const currentSection = sectionsData[currentSectionIndex];
  const currentSectionTotalViews = currentSection?.views.length || 0;
  const currentView = currentSection?.views[currentViewIndex];
  const totalViews = sectionsData.flatMap((section) => section.views).length;
  const totalAvailableSeats = sectionsData
    .flatMap((section) => section.views)
    .flatMap((view) => view.seats)
    .filter((seat) => seat.status === "Available").length;
  // const totalViews = currentSection?.views.length || 0;

  // ==================== DESKTOP VIEW ====================
  if (isDesktop) {
    return (
      <View style={styles.desktopContainer}>
        {/* Header */}
        <View style={styles.desktopHeader}>
          <Text style={styles.desktopTitle}>
            UPAT Theater - {selectedFloor} Floor
          </Text>
          <View style={styles.floorSelectorDesktop}>
            <TouchableOpacity
              style={[
                styles.floorButtonDesktop,
                selectedFloor === "First" && styles.floorButtonActiveDesktop,
              ]}
              onPress={() => setSelectedFloor("First")}
            >
              <Text style={styles.floorButtonTextDesktop}>First Floor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.floorButtonDesktop,
                selectedFloor === "Second" && styles.floorButtonActiveDesktop,
              ]}
              onPress={() => setSelectedFloor("Second")}
            >
              <Text style={styles.floorButtonTextDesktop}>Second Floor</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* All Sections Side-by-Side */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.desktopSectionsContainer}
        >
          {sectionsData.map((section, idx) => (
            <View key={idx} style={styles.desktopSection}>
              <Text style={styles.desktopSectionTitle}>{section.section}</Text>
              <Text style={styles.desktopSectionSubtitle}>
                {section.totalSeats} seats • Rows {section.rowRange.start}-
                {section.rowRange.end}
              </Text>

              {/* Single view (no split on desktop) */}
              <SeatGrid
                seats={section.views[0].seats}
                onSeatPress={toggleSeatSelection}
                selectedSeats={selectedSeat}
                isDesktop={isDesktop}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  // ==================== MOBILE VIEW ====================
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Section Header */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{currentSection?.section}</Text>
        </View>
      </View>

      {/* Seat Grid */}
      <ScrollView style={styles.seatGridScrollView}>
        <View style={styles.seatGridContainer}>
          {currentView && (
            <SeatGrid
              seats={currentView.seats}
              onSeatPress={toggleSeatSelection}
              selectedSeats={selectedSeat}
              isDesktop={isDesktop}
            />
          )}
        </View>
      </ScrollView>

      {/* View Navigation */}
      {totalViews > 1 && (
        <View style={styles.viewNavigation}>
          <TouchableOpacity
            style={[
              styles.viewNavButton,
              currentViewIndex === 0 &&
                currentSectionIndex === 0 &&
                styles.viewNavButtonDisabled,
            ]}
            onPress={() => {
              if (currentViewIndex > 0) {
                setCurrentViewIndex(
                  Math.min(totalViews - 1, currentViewIndex - 1),
                );
              } else if (currentSectionIndex > 0) {
                // Move to previous section, last view
                const prevSection = sectionsData[currentSectionIndex - 1];
                setCurrentSectionIndex(currentSectionIndex - 1);
                setCurrentViewIndex(prevSection.views.length - 1);
              }
            }}
            disabled={currentViewIndex === 0 && currentSectionIndex === 0}
          >
            <Text style={styles.viewNavText}>◀ View</Text>
          </TouchableOpacity>

          <Text style={styles.viewIndicator}>
            View{" "}
            {sectionsData
              .slice(0, currentSectionIndex)
              .reduce((sum, s) => sum + s.views.length, 0) +
              currentViewIndex +
              1}{" "}
            of {totalViews}
          </Text>

          <TouchableOpacity
            style={[
              styles.viewNavButton,
              currentViewIndex === currentSectionTotalViews - 1 &&
                currentSectionIndex === sectionsData.length - 1 &&
                styles.viewNavButtonDisabled,
            ]}
            onPress={() => {
              if (currentViewIndex < currentSectionTotalViews - 1) {
                setCurrentViewIndex(
                  Math.min(totalViews - 1, currentViewIndex + 1),
                );
              } else if (currentSectionIndex < sectionsData.length - 1) {
                setCurrentSectionIndex(currentSectionIndex + 1);
                setCurrentViewIndex(0);
              }
            }}
            disabled={
              currentViewIndex === currentSectionTotalViews - 1 &&
              currentSectionIndex === sectionsData.length - 1
            }
          >
            <Text style={styles.viewNavText}>View ▶</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Section Navigation */}
      {/* <View style={styles.sectionNavigation}> */}
      {/*   <TouchableOpacity */}
      {/*     style={[ */}
      {/*       styles.navButton, */}
      {/*       currentSectionIndex === 0 && styles.navButtonDisabled, */}
      {/*     ]} */}
      {/*     onPress={() => { */}
      {/*       setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1)); */}
      {/*       setCurrentViewIndex(0); */}
      {/*     }} */}
      {/*     disabled={currentSectionIndex === 0} */}
      {/*   > */}
      {/*     <Text style={styles.navButtonText}>◀ Section</Text> */}
      {/*   </TouchableOpacity> */}
      {/**/}
      {/*   <Text style={styles.sectionIndicator}> */}
      {/*     {currentSectionIndex + 1} / {sectionsData.length} */}
      {/*   </Text> */}
      {/**/}
      {/*   <TouchableOpacity */}
      {/*     style={[ */}
      {/*       styles.navButton, */}
      {/*       currentSectionIndex === sectionsData.length - 1 && */}
      {/*         styles.navButtonDisabled, */}
      {/*     ]} */}
      {/*     onPress={() => { */}
      {/*       setCurrentSectionIndex( */}
      {/*         Math.min(sectionsData.length - 1, currentSectionIndex + 1), */}
      {/*       ); */}
      {/*       setCurrentViewIndex(0); */}
      {/*     }} */}
      {/*     disabled={currentSectionIndex === sectionsData.length - 1} */}
      {/*   > */}
      {/*     <Text style={styles.navButtonText}>Section ▶</Text> */}
      {/*   </TouchableOpacity> */}
      {/* </View> */}

      {/* Floor Selector */}
      <View style={styles.floorSelector}>
        <View style={styles.floorInnerContainer}>
          <TouchableOpacity
            style={[
              styles.floorButton,
              selectedFloor === "First" && styles.floorButtonActive,
            ]}
            onPress={() => setSelectedFloor("First")}
          >
            <Text
              style={[
                styles.floorButtonText,
                selectedFloor === "First" && styles.floorButtonTextActive,
              ]}
            >
              First Floor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.floorButton,
              selectedFloor === "Second" && styles.floorButtonActive,
            ]}
            onPress={() => setSelectedFloor("Second")}
          >
            <Text
              style={[
                styles.floorButtonText,
                selectedFloor === "Second" && styles.floorButtonTextActive,
              ]}
            >
              Second Floor
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seat Details */}
      <View style={styles.seatDetails}>
        <View style={styles.seatDetailsContainer}>
          <Text style={styles.availableSeatsText}>
            Available Seats: {totalAvailableSeats}
          </Text>

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendAvailable]} />
              <Text style={styles.legendText}>Available</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendReserved]} />
              <Text style={styles.legendText}>Reserved</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendSpecial]} />
              <Text style={styles.legendText}>Special</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.legendBox, styles.legendSelected]} />
              <Text style={styles.legendText}>Selected</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Component Section
const SeatGrid: React.FC<SeatGridProps> = ({
  seats,
  onSeatPress,
  selectedSeats,
  isDesktop,
}) => {
  // Group seats by row
  const seatsByRow = seats.reduce(
    (acc, seat) => {
      const row = seat.seatRow || "N/A";
      if (!acc[row]) acc[row] = [];
      acc[row].push(seat);
      return acc;
    },
    {} as Record<string, SeatDto[]>,
  );

  // Seat button sizes
  const buttonSize = isDesktop
    ? { width: 60, height: 45, fontSize: 13 }
    : { width: 34, height: 30, fontSize: 12 };

  return (
    <View style={styles.seatGrid}>
      {Object.keys(seatsByRow)
        .sort()
        .map((rowKey) => {
          // Store seat object
          const rowSeats = seatsByRow[rowKey];
          // Seats
          return (
            <View key={rowKey} style={styles.seatRow}>
              <View style={styles.rowSeats}>
                {rowSeats.map((seat) => {
                  const isSelected = selectedSeats === seat.seatId;
                  const isReserved = seat.status === "Reserved";
                  const isDisabled = seat.status === "Disabled";
                  const isAvailable = seat.status === "Available";

                  return (
                    <TouchableOpacity
                      key={seat.seatId}
                      style={[
                        styles.seatButton,
                        { width: buttonSize.width, height: buttonSize.height },
                        isAvailable && styles.seatButtonAvailable,
                        isSelected && styles.seatButtonSelected,
                        isReserved && styles.seatButtonReserved,
                        isDisabled && styles.seatButtonDisabled,
                        seat.isSpecial && styles.seatButtonSpecial,
                      ]}
                      onPress={() => onSeatPress(seat.seatId, seat.status)}
                      disabled={!isAvailable || isSelected}
                    >
                      <Text
                        style={[
                          styles.seatButtonText,
                          isSelected && styles.seatButtonTextSelected,
                        ]}
                      >
                        {seat.displaySeatCode}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
    </View>
  );
};

// Styles Section
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Desktop Styles
  desktopContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  desktopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  desktopTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  floorSelectorDesktop: {
    flexDirection: "row",
    gap: 10,
  },
  floorButtonDesktop: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  floorButtonActiveDesktop: {
    backgroundColor: "#941418",
  },
  floorButtonTextDesktop: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  desktopSectionsContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 30,
  },
  desktopSection: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 20,
    minWidth: 400,
  },
  desktopSectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  desktopSectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },

  // Mobile Styles

  floorSelector: {
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  floorInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    margin: 10,
    gap: 3,
    width: "75%",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "black",
  },
  floorButton: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 100,
    alignItems: "center",
  },
  floorButtonActive: {
    backgroundColor: "#941418",
  },
  floorButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  floorButtonTextActive: {
    color: "#FFF",
  },
  seatDetails: {
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  seatDetailsContainer: {
    width: "90%",
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 30,
  },
  availableSeatsText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#000",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendBox: {
    width: 15,
    height: 15,
    borderRadius: 4,
    borderWidth: 1,
  },
  legendAvailable: {
    backgroundColor: "#1C1C1C",
    borderColor: "#1C1C1C",
  },
  legendReserved: {
    backgroundColor: "#525252",
    borderColor: "#525252",
  },
  legendSpecial: {
    backgroundColor: "#F7BD03",
    borderColor: "#F7BD03",
  },
  legendSelected: {
    backgroundColor: "#941418",
    borderColor: "#941418",
  },
  legendText: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  sectionContainer: {
    padding: 15,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  sectionHeader: {
    padding: 15,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#525252",
    borderRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  seatGridScrollView: {
    flex: 1,
    padding: 12,
  },
  seatGridContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  seatGrid: {
    gap: 5,
  },
  seatRow: {
    marginBottom: 1,
  },
  rowSeats: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 3,
    justifyContent: "flex-end",
  },
  seatButton: {
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  seatButtonAvailable: {
    backgroundColor: "#1C1C1C",
    borderColor: "#1C1C1C",
  },
  seatButtonSelected: {
    backgroundColor: "#941418",
    borderColor: "#941418",
  },
  seatButtonReserved: {
    backgroundColor: "#525252",
    borderColor: "#525252",
  },
  seatButtonDisabled: {
    backgroundColor: "#6E6E6E",
    borderColor: "#6E6E6E",
  },
  seatButtonSpecial: {
    backgroundColor: "#F7BD03",
    borderColor: "#F7BD03",
  },
  seatButtonText: {
    fontSize: 12,
    color: "#FFF",
  },
  seatButtonTextSelected: {
    color: "#FFF",
  },

  // Navigation
  viewNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  viewNavButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#941418",
  },
  viewNavButtonDisabled: {
    backgroundColor: "#CCC",
  },
  viewNavText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFF",
  },
  viewIndicator: {
    fontSize: 14,
    fontWeight: "600",
  },
  // sectionNavigation: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   padding: 16,
  //   backgroundColor: "#FFF",
  //   borderTopWidth: 1,
  //   borderTopColor: "#E5E5E5",
  // },
  // navButton: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 16,
  //   borderRadius: 8,
  //   backgroundColor: "#941418",
  // },
  // navButtonDisabled: {
  //   backgroundColor: "#CCC",
  // },
  // navButtonText: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#FFF",
  // },
  // sectionIndicator: {
  //   fontSize: 16,
  //   fontWeight: "600",
  // },
  // selectionText: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: "#FFF",
  // },
});

export default SeatMapView;
