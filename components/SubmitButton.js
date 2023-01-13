import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../constants/colors";

const SubmitButton = (props) => {
  const enabledBgColor = props.color || colors.primary;
  const disabledBgColor = colors.lightGrey;
  const bgColor = props.disabled ? disabledBgColor : enabledBgColor;

  return (
    <TouchableOpacity
      onPress={props.disabled ? () => {} : props.onPress}
      style={{
        ...styles.button,
        ...props.style,
        ...{ backgroundColor: bgColor },
      }}
    >
      <Text
        style={
          props.title === "Logout"
            ? { color: "white" }
            : { color: props.disabled ? colors.grey : colors.primary100 }
        }
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SubmitButton;