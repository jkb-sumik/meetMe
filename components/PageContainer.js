import { View } from "react-native";

const PageContainer = (props) => {
  const container = {
    paddingHorizontal: 20,
    flex: 1,
  };
  props.background
    ? (container.backgroundColor = props.background)
    : (container.backgroundColor = "white");
  return <View style={{ ...container, ...props.style }}>{props.children}</View>;
};

export default PageContainer;
