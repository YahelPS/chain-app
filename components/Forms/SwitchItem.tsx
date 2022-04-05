import { View } from "react-native";
import React, { useState } from "react";
import { Switch } from "react-native-paper";
import { colors, Text } from "../../themes/Theme";
import HView from "../App/HView";

export default function SwitchItem({
  title = "",
  enabled = false,
  description = "",
  action = () => {},
}) {
  const [value, setValue] = useState(enabled);
  function onChange(v: boolean) {
    setValue(v);
    action(v);
  }
  return (
    <Switch
      value={value}
      onValueChange={onChange}
      color={colors["primary.500"]}
      style={{ position: "absolute", right: 0 }}
    />
  );
}
