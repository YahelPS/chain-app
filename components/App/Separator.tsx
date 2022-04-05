import { View } from "react-native";
import React from "react";
import { colors, Text } from "../../themes/Theme";

export default function Separator({ text }: { text?: string }) {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", padding: 10 }}
    >
      <View
        style={{
          alignSelf: "center",
          width: "100%",
          height: 2,
          backgroundColor: colors["grey.400"],
        }}
      />
      {text && (
        <Text
          variant="seperator"
          style={{
            position: "absolute",
            backgroundColor: "#200f36",
            paddingHorizontal: 5,
          }}
        >
          {text}
        </Text>
      )}
    </View>
  );
}
