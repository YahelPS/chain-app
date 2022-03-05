import { View, Image } from "react-native";
import React from "react";
import { Text } from "..";
import HView from "../App/HView";

interface CurrencyProps {
  amount: any;
  type: "VP" | "Radianite";
}

export default function ValorantCurrency({ amount, type }: CurrencyProps) {
  const assets = {
    VP:
      "https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/displayicon.png",
    Radianite:
      "https://media.valorant-api.com/currencies/e59aa87c-4cbf-517a-5983-6e81511be9b7/displayicon.png",
  };
  return (
    <HView style={{ justifyContent: "center", paddingHorizontal: 10 }}>
      <Image
        source={{
          uri: assets[type],
          height: 14,
          width: 14,
        }}
        style={{ marginTop: 3, marginRight: 3 }}
      />
      <Text variant="heading4">{amount}</Text>
    </HView>
  );
}
