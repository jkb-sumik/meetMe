import { View } from "react-native";
import ProfileImage from "./ProfileImage";

const MyCustomMarkerView = ({ image }) => {
  console.log(image);
  return (
    <View>
      <ProfileImage uri={image} size={40} />
    </View>
  );
};

export default MyCustomMarkerView;
