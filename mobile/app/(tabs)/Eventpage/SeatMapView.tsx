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
  LayoutAnimation,
  UIManager,
  Modal,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Map as MapIcon,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Types
import {
  SectionData,
  FloorSeatsResponse,
  SeatDto,
  SeatGridProps,
} from "@/types/seat-map";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const API_BASE_URL = Constants.expoConfig?.extra?.API_URL + "/api";

// Device Detection
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

  return { width, isMobile, isTablet, isDesktop, isWeb };
};

// Main SeatMapView
const SeatMapView = () => {
  const router = useRouter();

  const [selectedFloor, setSelectedFloor] = useState<"First" | "Second">(
    "First",
  );
  const [sectionsData, setSectionsData] = useState<SectionData[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  // Loading & Error States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selection State
  const [selectedSeat, setSelectedSeat] = useState<number>(0);

  // MODAL STATES
  const [isModalVisible, setModalVisible] = useState(false);
  const [pendingSeat, setPendingSeat] = useState<{
    id: number;
    code: string;
  } | null>(null);

  // Visibility of Bottom Controls
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);

  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Fetch seats when floor or screen size changes
  useEffect(() => {
    fetchSeats(selectedFloor);
  }, [selectedFloor, isMobile]);

  // API Calls
  const fetchSeats = async (floor: string) => {
    try {
      setLoading(true);
      setError(null);

      let url = `${API_BASE_URL}/seat/by-floor/${floor.toLowerCase()}`;
      if (isMobile || isTablet) {
        url += `?mobile=true`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: FloorSeatsResponse = await response.json();
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

  // Open Modal
  const handleSeatClick = (
    seatId: number,
    seatCode: string,
    status: string,
  ) => {
    if (status !== "Available") return;
    setPendingSeat({ id: seatId, code: seatCode });
    setModalVisible(true);
  };

  // Confirm Modal
  const handleConfirmSeat = () => {
    if (pendingSeat) {
      setSelectedSeat(pendingSeat.id);
    }
    setModalVisible(false);
    setPendingSeat(null);
  };

  // Cancel Modal
  const handleCancelModal = () => {
    setModalVisible(false);
    setPendingSeat(null);
  };

  const handleBack = () => {
    router.back();
  };

  const togglePanel = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsPanelExpanded(!isPanelExpanded);
  };

  // Render Loading State
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#941418" />
        <Text style={styles.loadingText}>Loading seat map...</Text>
      </View>
    );
  }

  // Render Error State
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

  // DESKTOP VIEW
  if (isDesktop) {
    return (
      <View style={styles.desktopContainer}>
        {/* ... (Desktop view remains mostly same, passing new handler) ... */}
        <View style={styles.desktopHeader}>
          <TouchableOpacity onPress={handleBack} style={{ marginRight: 15 }}>
            <ChevronLeft size={30} color="#000" />
          </TouchableOpacity>
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
              <SeatGrid
                seats={section.views[0].seats}
                onSeatPress={handleSeatClick}
                selectedSeats={selectedSeat}
                isDesktop={isDesktop}
              />
            </View>
          ))}
        </ScrollView>

        {/* Modal for Desktop */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleCancelModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Seat Confirmation</Text>
              <Text style={styles.modalText}>
                Is this your desired seat? Seat {pendingSeat?.code}
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={handleCancelModal}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalConfirmButton}
                  onPress={handleConfirmSeat}
                >
                  <Text style={styles.modalConfirmText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // MOBILE VIEW
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ChevronLeft size={24} color="#941418" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Seat</Text>
        </View>
        <View style={styles.dividerLine} />
      </View>

      {/* Section Title Banner */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{currentSection?.section}</Text>
        </View>
      </View>

      {/* Seat Grid */}
      <ScrollView
        style={styles.seatGridScrollView}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View style={styles.seatGridContainer}>
          {currentView && (
            <SeatGrid
              seats={currentView.seats}
              onSeatPress={handleSeatClick}
              selectedSeats={selectedSeat}
              isDesktop={isDesktop}
            />
          )}
        </View>
      </ScrollView>

      {/* Collapsible Bottom Control Panel */}
      <View
        style={[
          styles.bottomPanel,
          !isPanelExpanded && styles.bottomPanelCollapsed,
        ]}
      >
        {/* Panel Handle */}
        <TouchableOpacity
          style={styles.panelHandleContainer}
          onPress={togglePanel}
          activeOpacity={0.9}
        >
          <View style={styles.panelHandleBar} />
          <View style={styles.panelHeaderContent}>
            <MapIcon size={16} color="#525252" />
            <Text style={styles.panelTitle}>
              {isPanelExpanded ? "Hide Controls" : "Show Controls"}
            </Text>
            {isPanelExpanded ? (
              <ChevronDown size={16} color="#525252" />
            ) : (
              <ChevronUp size={16} color="#525252" />
            )}
          </View>
        </TouchableOpacity>

        {/* Collapsible Content */}
        {isPanelExpanded && (
          <View style={styles.panelContent}>
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
                      const prevSection = sectionsData[currentSectionIndex - 1];
                      setCurrentSectionIndex(currentSectionIndex - 1);
                      setCurrentViewIndex(prevSection.views.length - 1);
                    }
                  }}
                  disabled={currentViewIndex === 0 && currentSectionIndex === 0}
                >
                  <Text style={styles.viewNavText}>◀</Text>
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
                  <Text style={styles.viewNavText}>▶</Text>
                </TouchableOpacity>
              </View>
            )}

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
                    1st Floor
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
                      selectedFloor === "Second" &&
                        styles.floorButtonTextActive,
                    ]}
                  >
                    2nd Floor
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Legend & Stats */}
            <View style={styles.seatDetailsContainer}>
              <Text style={styles.availableSeatsText}>
                Available: {totalAvailableSeats}
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
                  <Text style={styles.legendText}>You</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* SEAT CONFIRMATION MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCancelModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Title */}
            <Text style={styles.modalTitle}>Seat Confirmation</Text>
            <Text style={styles.modalText}>Is this your desired seat?</Text>

            <Image
              source={require("@/assets/images/illustration6.png")}
              style={styles.modalImage}
              resizeMode="contain"
            />

            <Text style={styles.modalSeatCode}>Seat {pendingSeat?.code}</Text>

            {/* Buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleCancelModal}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleConfirmSeat}
                activeOpacity={0.7}
              >
                <Text style={styles.modalConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Component Section
const SeatGrid: React.FC<
  SeatGridProps & {
    onSeatPress: (id: number, code: string, status: string) => void;
  }
> = ({ seats, onSeatPress, selectedSeats, isDesktop }) => {
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
                      onPress={() =>
                        onSeatPress(
                          seat.seatId,
                          seat.displaySeatCode,
                          seat.status,
                        )
                      }
                      disabled={!isAvailable || isSelected}
                    >
                      <Text
                        style={[
                          styles.seatButtonText,
                          { fontSize: buttonSize.fontSize },
                          isSelected && styles.seatButtonTextSelected,
                        ]}
                        numberOfLines={1}
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
  // Base Layout
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  // Header
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "#fff",
  },
  headerTop: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    paddingVertical: 5,
  },
  backButton: {
    position: "absolute",
    left: 16,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: "Poppins-Semibold",
    fontSize: 16,
    color: "#941418",
    textAlign: "center",
  },
  dividerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "#525252",
    opacity: 0.5,
    marginTop: 10,
    marginBottom: 10,
  },

  // Section Banner
  sectionContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  sectionHeader: {
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#941418",
    borderRadius: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
  },

  // Seat Grid Area
  seatGridScrollView: {
    flex: 1,
  },
  seatGridContainer: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  seatGrid: {
    gap: 4,
  },
  seatRow: {
    marginBottom: 1,
  },
  rowSeats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 3,
  },

  // Bottom Control Panel
  bottomPanel: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 15,
    paddingBottom: 90,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  bottomPanelCollapsed: {
    paddingBottom: 90,
  },
  panelHandleContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  panelHandleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginBottom: 8,
  },
  panelHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  panelTitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
  },
  panelContent: {
    width: "100%",
    paddingTop: 10,
  },
  viewNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  viewNavButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#941418",
  },
  viewNavButtonDisabled: {
    backgroundColor: "#f0f0f0",
  },
  viewNavText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  viewIndicator: {
    fontSize: 14,
    fontFamily: "Poppins-Semibold",
    color: "#1C1C1C",
  },

  // Mobile Styles

  floorSelector: {
    alignItems: "center",
    marginBottom: 15,
  },
  floorInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    gap: 3,
    width: "70%",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#e0e0e0",
    backgroundColor: "#f9f9f9",
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
    fontSize: 13,
    fontWeight: "600",
    color: "#525252",
  },
  floorButtonTextActive: {
    color: "#FFF",
  },
  seatDetailsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  availableSeatsText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
    color: "#525252",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 3,
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
    color: "#525252",
  },

  // Seat Buttons
  seatButton: {
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
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
    backgroundColor: "#E0E0E0",
    borderColor: "#E0E0E0",
  },
  seatButtonSpecial: {
    backgroundColor: "#F7BD03",
    borderColor: "#F7BD03",
  },
  seatButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  seatButtonTextSelected: {
    color: "#FFF",
  },

  // Loading / Error
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
    backgroundColor: "#941418",
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // Desktop Specific
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

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#941418",
  },
  modalText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#1C1C1C",
    textAlign: "center",
    marginBottom: 30,
  },
  modalImage: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  modalSeatCode: {
    fontFamily: "Poppins-Bold",
    fontSize: 40,
    color: "#1C1C1C",
    textAlign: "center",
    marginBottom: 30,
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
    justifyContent: "center",
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#a1a1a1",
    alignItems: "center",
  },
  modalCancelText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#525252",
  },
  modalConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#941418",
    alignItems: "center",
  },
  modalConfirmText: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    color: "#FFF",
  },
});

export default SeatMapView;
