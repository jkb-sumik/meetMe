import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  Modal,
} from "react-native";
import PageContainer from "../components/PageContainer";
import { Calendar } from "react-native-calendars";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import commonStyles from "../constants/commonStyles";

const CalendarScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <Text style={styles.searchBox}>{searchDate || "All events"}</Text>
        <MaterialIcons
          name="clear"
          size={30}
          color={colors.primary500}
          style={{ marginRight: 15 }}
          onPress={() => setSearchDate("")}
        />
        <FontAwesome
          name="calendar"
          size={25}
          color={colors.primary500}
          onPress={() => setShowModal(true)}
        />
      </View>

      {isLoading && (
        <View style={commonStyles.center}>
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      )}
      {!isLoading && showModal && (
        <Modal visible={showModal} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <Calendar
              style={styles.calendar}
              onDayPress={(date) => {
                setSearchDate(date.dateString);
                setShowModal(false);
              }}
              markingType={"custom"}
              markedDates={{
                [searchDate]: {
                  customStyles: {
                    container: {
                      backgroundColor: colors.primary500,
                    },
                    text: {
                      color: colors.primary100,
                      fontWeight: "bold",
                    },
                  },
                },
              }}
              theme={{
                calendarBackground: colors.backgroundBlue,
                textSectionTitleColor: "#b6c1cd",
              }}
            />
          </View>
        </Modal>
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundBlue,
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  searchBox: {
    marginLeft: 8,
    fontSize: 25,
    width: "75%",
    color: "#DBF227",
  },
  noResultsIcon: {
    marginBottom: 20,
  },
  noResultsText: {
    color: colors.textColor,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    margin: 40,
  },
});

export default CalendarScreen;
