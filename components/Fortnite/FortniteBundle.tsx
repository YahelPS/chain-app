import React from "react";
import { StyleSheet, View } from "react-native";
import CachedImage from "../App/CachedImage";
import { Text } from "..";
import FortniteCurrency from "./FortniteCurrency";

interface BundleProps {
  image: string;
  name: string;
  cost: number;
  items: object[];
}

export default function FortniteBundle({ image, name, cost }: BundleProps) {
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.texts}>
        <Text variant="fortniteTitle">{name}</Text>
      </View>
      <View style={styles.cost}>
        <FortniteCurrency amount={cost} />
      </View>
      <CachedImage
        uri={image}
        style={{
          width: 412,
          height: 170,
          transform: [{ scale: 0.9 }],
          borderRadius: 8,
          resizeMode: "repeat",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  texts: {
    zIndex: 10,
    top: 20,
    left: 40,
    position: "absolute",
  },
  time: {
    color: "#e1e5ab",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "val",
  },
  title: {
    color: "#eaeaec",
    fontWeight: "bold",
    fontSize: 35,
    fontFamily: "val",
  },
  image: { position: "absolute" },
  cost: {
    zIndex: 10,
    bottom: 20,
    right: 20,
    position: "absolute",
    justifyContent: "center",
  },
});
