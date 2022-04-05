import { View, StyleSheet, TextInput, KeyboardTypeOptions } from "react-native";
import React, { useRef } from "react";
import { colors } from "../../themes/Theme";
import { Feather } from "@expo/vector-icons";
import { Text } from "..";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface InputProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  icon?: any;
  defaultValue?: string;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  value: string;
  capitalize?: boolean;
}

export default function Input({
  placeholder = "",
  icon = null,
  defaultValue = "",
  keyboardType = "default",
  capitalize = true,
  label = "",
  value = "",
  onChangeText,
}: InputProps) {
  const textInput = useRef(null);
  return (
    <TouchableWithoutFeedback
      style={{ paddingBottom: 5 }}
      //@ts-ignore
      onPress={() => textInput.current.focus()}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text variant="label">{label}</Text>
        {/* <Feather
          name="help-circle"
          color={colors["grey.400"]}
          size={12}
          style={{ paddingLeft: 2 }}
        /> */}
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
          //@ts-ignore
          autoCapitalize={capitalize ? "sentences" : "none"}
          ref={textInput}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
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
