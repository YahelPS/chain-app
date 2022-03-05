import { View, Text } from "react-native";
import React from "react";

export default function HView(props: any) {
  return <View {...props} style={[{ flexDirection: "row" }, props.style]} />;
}
