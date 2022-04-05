import { Slider, View } from "react-native";
import React, { useState } from "react";
import { Switch } from "react-native-paper";
import { colors, Text } from "../../themes/Theme";
import HView from "../App/HView";
import SwitchItem from "./SwitchItem";
import Input from "../App/Input";
import { Picker } from "@react-native-picker/picker";
import InputItem from "./InputItem";
import PickerItem from "./PickerItem";

interface Props {
  title: string;
  type: "switch" | "input" | "select" | "slider";
  description: string;
  options: any;
}

const formItems = {
  switch: SwitchItem,
  input: InputItem,
  select: PickerItem,
  slider: Slider,
};

export default function FormComponent(props: Props) {
  const FormComp = formItems[props.type];
  return (
    <View style={{ paddingTop: 20 }}>
      <HView
        style={{
          paddingBottom: props.type !== "input" ? 10 : 0,
          alignItems: "center",
        }}
      >
        <Text variant="heading3">{props.title}</Text>
        {!["select", "input", "slider"].includes(props.type) && (
          <FormComp {...props} />
        )}
      </HView>
      {props.type === "input" && <FormComp {...props} />}
      <Text variant="body">{props.description}</Text>
      {["slider", "select"].includes(props.type) && <FormComp {...props} />}
    </View>
  );
}
