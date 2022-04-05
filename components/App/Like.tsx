import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../themes/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function Like({ liked = false, onPress = () => {} }) {
  const [solid, setSolid] = useState(liked);
  return (
    <TouchableOpacity
      onPress={() => {
        setSolid(!solid);
        onPress();
      }}
      containerStyle={{ height: 30, width: 30 }}
    >
      <FontAwesome5
        name="heart"
        solid={solid}
        color={colors["negative.400"]}
        size={20}
      />
    </TouchableOpacity>
  );
}
