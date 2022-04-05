import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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

export default function Nav({
  title,
  variant = "primary",
  disabled = false,
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
      <HView
        style={{
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading4">{title}</Text>
        <Text variant="heading2">
          <Feather name="chevron-right" size={18} />
        </Text>
      </HView>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
    color: "red",
    height: 50,
    width: 200,
    borderRadius: 20,
  },
});
