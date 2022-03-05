import { View, StyleSheet, TextInput, KeyboardTypeOptions } from "react-native";
import React from "react";
import { colors } from "../../themes/Theme";
import { Feather } from "@expo/vector-icons";
import { Text } from "..";

interface InputProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  icon?: any;
  defaultValue?: string;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  value: string;
}

export default function Input({
  placeholder = "",
  icon = null,
  defaultValue = "",
  keyboardType = "default",
  label = "",
  value = "",
  onChangeText,
}: InputProps) {
  return (
    <View style={{ paddingVertical: 5 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text variant="label">{label}</Text>
        <Feather
          name="help-circle"
          color={colors["grey.400"]}
          size={12}
          style={{ paddingLeft: 2 }}
        />
      </View>
      <View style={styles.inputContainer}>
        {icon}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={placeholder}
          defaultValue={defaultValue}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginTop: 5,
    backgroundColor: "#161F27",
    borderRadius: 8,
    borderColor: colors["grey.400"],
    borderWidth: 1,
    width: "100%",
  },
  input: {
    width: "100%",
    height: "100%",
    paddingLeft: 6,
    fontFamily: "Mulish-SemiBold",
    paddingRight: 6,
    color: colors["grey.400"],
  },
});
