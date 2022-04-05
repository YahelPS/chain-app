import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { fonts } from "../../App";

export default function PickerItem({ options }: { options: any }) {
  const [selectedLanguage, setSelectedLanguage] = useState("java");

  return (
    <View>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        // style={{ height: 100, width: "100%", color: "white" }}
      >
        {options.map((option: any) => (
          <Picker.Item label={option.title} value={option.key} color="white" />
        ))}
      </Picker>
    </View>
  );
}
