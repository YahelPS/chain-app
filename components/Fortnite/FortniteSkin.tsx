import React from "react";
import { StyleSheet, View } from "react-native";
import CachedImage from "../App/CachedImage";
import { Text } from "..";
import FortniteCurrency from "./FortniteCurrency";

interface SkinProps {
  image: string;
  name: string;
  cost: any;
}

export default function FortniteSkin({ image, name, cost }: SkinProps) {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: "#00958733",
        borderRadius: 8,
      }}
    >
      <View style={styles.texts}>
        <Text variant="fortniteTitle" style={{ fontSize: 20 }}>
          {name}
        </Text>
      </View>
      <View style={styles.cost}>
        <FortniteCurrency amount={cost} />
      </View>
      <CachedImage
        uri={image}
        style={{
          width: 175,
          height: 175,
          borderRadius: 8,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    position: "relative",
    height: 175,
    width: 175,
    // alignItems: "center",
    // justifyContent: "center",
  },
  texts: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    left: 20,
    maxWidth: 150,
  },
  cost: {
    zIndex: 10,
    bottom: 5,
    left: 0,
    position: "absolute",
    justifyContent: "center",
  },
});
