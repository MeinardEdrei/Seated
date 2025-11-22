// File: components/StepTwo.tsx
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import {
  CalendarDays,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";

interface StepTwoProps {
  eventDate: string;
  setEventDate: (value: string) => void;
  startTime: string;
  setStartTime: (value: string) => void;
  endTime: string;
  setEndTime: (value: string) => void;
}

export default function StepTwo({
  eventDate,
  setEventDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}: StepTwoProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(10); // November (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState<number | null>(13);

  // Time picker states
  const [tempHour, setTempHour] = useState("10");
  const [tempMinute, setTempMinute] = useState("30");
  const [tempPeriod, setTempPeriod] = useState("AM");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(day);
    const dateStr = `${monthNames[currentMonth]} ${day}, ${currentYear}`;
    setEventDate(dateStr);
    setShowCalendar(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      const isBooked = day === 11 || day === 18; // Example booked dates
      const isUnavailable = day === 16; // Example unavailable date

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isSelected && styles.calendarDaySelected,
            isBooked && styles.calendarDayBooked,
            isUnavailable && styles.calendarDayUnavailable,
          ]}
          onPress={() => !isBooked && handleDateSelect(day)}
          disabled={isBooked}
        >
          <Text
            style={[
              styles.calendarDayText,
              isSelected && styles.calendarDayTextSelected,
              (isBooked || isUnavailable) && styles.calendarDayTextDisabled,
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const handleTimePickerOpen = (type: "start" | "end") => {
    const time = type === "start" ? startTime : endTime;
    const [timePart, period] = time.split(" ");
    const [hour, minute] = timePart.split(":");

    setTempHour(hour);
    setTempMinute(minute);
    setTempPeriod(period);

    if (type === "start") {
      setShowStartTimePicker(true);
    } else {
      setShowEndTimePicker(true);
    }
  };

  const handleTimeConfirm = (type: "start" | "end") => {
   const timeString = `${tempHour}:${tempMinute} ${tempPeriod}`;
    if (type === "start") {
      setStartTime(timeString);
      setShowStartTimePicker(false);
    } else {
      setEndTime(timeString);
      setShowEndTimePicker(false);
    }
  };

  const renderTimePicker = (type: "start" | "end") => {
    const hours = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    const minutes = ["00", "10", "20", "30", "40", "50"];
    const periods = ["AM", "PM"];

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.timePickerContainer}>
          <View style={styles.timePickerColumn}>
            {hours.map((h) => (
              <TouchableOpacity
                key={h}
                style={[
                  styles.timePickerItem,
                  tempHour === h && styles.timePickerItemSelected,
                ]}
                onPress={() => setTempHour(h)}
              >
                <Text
                  style={[
                    styles.timePickerText,
                    tempHour === h && styles.timePickerTextSelected,
                  ]}
                >
                  {h}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.timePickerColumn}>
            {minutes.map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.timePickerItem,
                  tempMinute === m && styles.timePickerItemSelected,
                ]}
                onPress={() => setTempMinute(m)}
              >
                <Text
                  style={[
                    styles.timePickerText,
                    tempMinute === m && styles.timePickerTextSelected,
                  ]}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.timePickerColumn}>
            {periods.map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.timePickerItem,
                  tempPeriod === p && styles.timePickerItemSelected,
                ]}
                onPress={() => setTempPeriod(p)}
              >
                <Text
                  style={[
                    styles.timePickerText,
                    tempPeriod === p && styles.timePickerTextSelected,
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      {/* Event Date */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Event Date</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.dateText}>{eventDate}</Text>
          <CalendarDays size={20} color="#525252" />
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCalendar(false)}
        >
          <View style={styles.calendarModal}>
            {/* Month Navigation */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={handlePreviousMonth}>
                <ChevronLeft size={24} color="#1C1C1C" />
              </TouchableOpacity>
              <Text style={styles.calendarHeaderText}>
                {monthNames[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity onPress={handleNextMonth}>
                <ChevronRight size={24} color="#1C1C1C" />
              </TouchableOpacity>
            </View>

            {/* Day Headers */}
            <View style={styles.calendarDayHeaders}>
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <Text key={day} style={styles.calendarDayHeader}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>{renderCalendar()}</View>

            {/* Bottom Labels */}
            <View style={styles.calendarLegend}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#941418" }]}
                />
                <Text style={styles.legendText}>Selected</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    { backgroundColor: "rgba(28, 28, 28, 0.7)" },
                  ]}
                />
                <Text style={styles.legendText}>Booked</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendDot,
                    {
                      backgroundColor: "rgba(82, 82, 82, 0.2)",
                    },
                  ]}
                />
                <Text style={styles.legendText}>Unavailable</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Event Time */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Event Time</Text>
        <View style={styles.timeRow}>
          {/* Start Time */}
          <View style={styles.timeInputWrapper}>
            <Text style={styles.timeLabel}>Start time</Text>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => handleTimePickerOpen("start")}
            >
              <Text style={styles.timeText}>{startTime}</Text>
              <Clock size={20} color="#525252" />
            </TouchableOpacity>
          </View>

          {/* End Time */}
          <View style={styles.timeInputWrapper}>
            <Text style={styles.timeLabel}>End time</Text>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => handleTimePickerOpen("end")}
            >
              <Text style={styles.timeText}>{endTime}</Text>
              <Clock size={20} color="#525252" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Start Time Picker Modal */}
      <Modal
        visible={showStartTimePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowStartTimePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowStartTimePicker(false)}
        >
          <View style={styles.timePickerModal}>
            {renderTimePicker("start")}
            <TouchableOpacity
              style={styles.timePickerConfirm}
              onPress={() => handleTimeConfirm("start")}
            >
              <Text style={styles.timePickerConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* End Time Picker Modal */}
      <Modal
        visible={showEndTimePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEndTimePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowEndTimePicker(false)}
        >
          <View style={styles.timePickerModal}>
            {renderTimePicker("end")}
            <TouchableOpacity
              style={styles.timePickerConfirm}
              onPress={() => handleTimeConfirm("end")}
            >
              <Text style={styles.timePickerConfirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
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
  dateInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.5)",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
  },
  timeRow: {
    flexDirection: "row",
    gap: 14,
  },
  timeInputWrapper: {
    flex: 1,
  },
  timeLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#1C1C1C",
    marginBottom: 4,
  },
  timeInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.5)",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Calendar Modal
  calendarModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 350,
    // height: 450,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  calendarHeaderText: {
    fontFamily: "Poppins-Semibold",
    fontSize: 18,
    color: "#1C1C1C",
  },
  calendarDayHeaders: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  calendarDayHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
    width: 40,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  calendarDay: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  calendarDaySelected: {
    backgroundColor: "#941418",
    borderRadius: 50,
  },
  calendarDayBooked: {
    backgroundColor: "rgba(28, 28, 28, 0.7)",
    borderRadius: 50,
  },
  calendarDayUnavailable: {
    backgroundColor: "rgba(82, 82, 82, 0.2)",
    borderRadius: 50,
  },
  calendarDayText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
  },
  calendarDayTextSelected: {
    color: "#FFE2A3",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
  },
  calendarDayTextDisabled: {
    color: "#FFFFFF",
  },
  calendarLegend: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(82, 82, 82, 0.3)",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 20,
  },
  legendText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#525252",
  },

  // Time Picker Modal
  timePickerModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    maxWidth: 300,
    maxHeight: 500,
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
  scrollContent: {
    width: "100%",
    paddingBottom: 20,
  },

  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  timePickerColumn: {
    gap: 10,
  },
  timePickerItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: "#F3F4F6",
  },
  timePickerItemSelected: {
    backgroundColor: "#941418",
  },
  timePickerText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#1C1C1C",
    textAlign: "center",
  },
  timePickerTextSelected: {
    color: "#FFFFFF",
    fontFamily: "Poppins-Semibold",
  },
  timePickerConfirm: {
    backgroundColor: "#941418",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  timePickerConfirmText: {
    fontFamily: "Poppins-Semibold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
