import { View, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../themes/Theme";
import { Text } from "..";
import HView from "./HView";
import { Feather } from "@expo/vector-icons";

export function hexToRgbA(hex: string, opacity = 1) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ","
    )},${opacity})`;
  }
  throw new Error("Bad Hex");
}

export default function Badge({
  text,
  color,
  icon,
}: {
  text: string;
  color: string;
  icon?: any;
}) {
  return (
    <HView style={[styles.badge, { backgroundColor: hexToRgbA(color, 0.5) }]}>
      {icon && <View style={{ paddingRight: 5 }}>{icon}</View>}
      <Text variant="body" style={{ color: "white" }}>
        {text}
      </Text>
    </HView>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 5,
  },
});
