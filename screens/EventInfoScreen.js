import { Image, StyleSheet, Text, View } from "react-native";

const EVENTS = {
  "734hf3h47fh3784f734fh": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 1",
    about: "Lalalalalalala",
    eventId: "734hf3h47fh3784f734fh",
    city: "Bielsko",
  },
  "834975nc8734975fh3478": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 2",
    about: "Lalalalalalala",
    eventId: "834975nc8734975fh3478",
    city: "Bielsko",
  },
  "2357cbeurfger65757575": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 3",
    about: "Lalalalalalala",
    eventId: "2357cbeurfger65757575",
    city: "Katowice",
  },
  "121212nhbc34444frgurg": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 4",
    about: "Lalalalalalala",
    eventId: "121212nhbc34444frgurg",
    city: "Katowice",
  },
  "834975nc8734978": {
    image:
      "https://pixabay.com/get/gb4414dbcf5ca7a9aa409b718307ea0b17732172c8a42224bc8e87f42d79476dba67c8a1ef5d03bf3e13f549c4201f3db6ef5a10735a1341d499996aff9de31a79cc2ed470360785f18f7cf4a420a95f1_640.jpg",
    title: "Extra Event 7",
    about: "Lalalalalalala",
    eventId: "834975nc8734975fh3478",
    city: "Bielsko",
  },
};

const EventInfoScreen = (props) => {
  const eventId = props.route?.params?.selectedEventId;
  const thisEvent = EVENTS[eventId];
  console.log(thisEvent);
  return (
    <View>
      <Image style={styles.image} source={{ uri: thisEvent.image }} />
      <Text>{thisEvent.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
});

export default EventInfoScreen;
