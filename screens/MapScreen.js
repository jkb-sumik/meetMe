import { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import MyCustomMarkerView from "../components/MyCustomMarkerView.";
import { MAP_STYLE } from "../constants/mapStyle";
import { setActiveUsers } from "../store/userSlice";
import { searchActiveUsers } from "../utils/actions/authActions";

const MapScreen = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const activeUsersResult = await searchActiveUsers(userData.city);
      dispatch(setActiveUsers({ newUsers: activeUsersResult }));
      setUsers(Object.values(activeUsersResult));
      console.log("refresh");
    })();
  }, [userData.city]);

  // const userPressed = (userId) => {
  //   navigation.navigate("Info", {
  //     selectedUserId: userId,
  //   });
  // };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: userData.coords.latitude,
          longitude: userData.coords.longitude,
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
            title={marker.firstLast}
            description={marker.about}
          >
            <MyCustomMarkerView image={marker.profilePicture} />
          </Marker>
        ))}
      </MapView>
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
});

export default MapScreen;
