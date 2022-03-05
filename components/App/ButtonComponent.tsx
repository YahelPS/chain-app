import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "..";
import { colors } from "../../themes/Theme";

interface ButtonComponentProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "primary" | "valorant";
}

export default function ButtonComponent({
  title,
  variant = "primary",
  disabled = false,
  onPress,
}: ButtonComponentProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor:
          variant === "primary" ? colors["primary.500"] : colors.valorant,
      }}
      disabled={disabled}
    >
      <Text variant="heading4">{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    height: 50,
    width: 200,
    borderRadius: 20,
  },
});
