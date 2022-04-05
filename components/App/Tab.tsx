import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "../../themes/Theme";
import HView from "./HView";

export default function Tab({
  text,
  active = false,
  onPress = () => {},
  onLayout,
}: {
  text: string;
  active?: boolean;
  onPress?: () => void;
  onLayout: any;
}) {
  return (
    <TouchableOpacity
      style={[styles.tab /*{ borderBottomWidth: active ? 5 : 2 }*/]}
      onPress={onPress}
      onLayout={onLayout}
    >
      <Text variant="heading4">{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    // paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomColor: "white",
    // borderBottomWidth: 2,
  },
});
