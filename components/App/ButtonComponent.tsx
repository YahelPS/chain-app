import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "..";
import { colors } from "../../themes/Theme";
import HView from "./HView";

interface ButtonComponentProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "primary" | "valorant" | "discord";
  icon?: any;
}

export default function ButtonComponent({
  title,
  variant = "primary",
  disabled = false,
  icon,
  onPress,
}: ButtonComponentProps) {
  const background = {
    primary: colors["primary.500"],
    valorant: colors.valorant,
    discord: colors.discord,
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: disabled ? "grey" : background[variant],
      }}
      disabled={disabled}
    >
      <Text variant="heading4">
        {icon && <HView style={{ paddingRight: 5 }}>{icon}</HView>}
        {title}
      </Text>
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
