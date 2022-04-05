import { View } from "react-native";
import React, { useState } from "react";
import Input from "../App/Input";

export default function InputItem({
  title = "",
  text = "false",
  description = "",
}) {
  const [value, setValue] = useState(text);
  return <Input value={value} onChangeText={setValue} />;
}
