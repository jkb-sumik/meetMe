import { useState } from "react";
import { useEffect } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import MyCustomMarkerView from "../components/MyCustomMarkerView.";
import { MAP_STYLE } from "../constants/mapStyle";
import { setActiveUsers } from "../store/userSlice";
import { searchActiveUsers } from "../utils/actions/authActions";
import SubmitButton from "../components/SubmitButton";
import ProfileImage from "../components/ProfileImage";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors";

const MapScreen = (props) => {
  const userCoords = props.route?.params?.selectedUserCoords;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [users, setUsers] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [userModalDate, setUserModalDate] = useState({});

  const lati = userCoords ? userCoords.latitude : userData.coords.latitude;
  const longi = userCoords ? userCoords.longitude : userData.coords.longitude;

  useEffect(() => {
    (async () => {
      const activeUsersResult = await searchActiveUsers(userData.city);
      dispatch(setActiveUsers({ newUsers: activeUsersResult }));
      setUsers(Object.values(activeUsersResult));
    })();
  }, [userData.city]);

  const userPressed = () => {
    setActiveModal(false);
    setUserModalDate({});
    props.navigation.navigate("Info", {
      selectedUserId: userModalDate.userId,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: lati,
          longitude: longi,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        customMapStyle={MAP_STYLE}
      >
        {users.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.coords.latitude,
              longitude: marker.coords.longitude,
            }}
            onPress={() => {
              setActiveModal(true);
              setUserModalDate(marker);
            }}
          >
            <MyCustomMarkerView image={marker.profilePicture} />
          </Marker>
        ))}
      </MapView>
      <Modal visible={activeModal} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.settingsView}>
            <Feather
              name="x"
              size={24}
              color="black"
              style={styles.button}
              onPress={() => setActiveModal(false)}
            />
            <View style={{ width: "100%", alignItems: "center" }}>
              <ProfileImage uri={userModalDate.profilePicture} size={120} />
            </View>
            <Text style={styles.modalTitle}>{userModalDate.firstLast}</Text>
            {userData.userId != userModalDate.userId && (
              <SubmitButton
                title="Profile"
                onPress={userPressed}
                color={colors.primary500}
                style={{ marginTop: 10 }}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  settingsView: {
    position: "relative",
    width: "60%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 10,
  },
  button: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    marginTop: 10,
  },
});

export default MapScreen;
