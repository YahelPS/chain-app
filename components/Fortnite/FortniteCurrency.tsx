import { View, Image } from "react-native";
import React from "react";
import { Text } from "..";
import HView from "../App/HView";

interface CurrencyProps {
  amount: any;
}

export default function FortniteCurrency({ amount }: CurrencyProps) {
  return (
    <HView style={{ justifyContent: "center", paddingHorizontal: 10 }}>
      <Image
        source={{
          uri: "https://fortnite-api.com/images/vbuck.png",
          height: 25,
          width: 25,
        }}
        style={{ marginTop: 4, marginRight: 3 }}
      />
      <Text variant="heading2">{amount}</Text>
    </HView>
  );
}
