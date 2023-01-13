import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";
import colors from "../constants/colors";

const CustomHeaderButton = (props) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={23}
    color={props.color ?? colors.blue}
    {...props}
  />
);

export default CustomHeaderButton;
