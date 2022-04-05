import { View, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Text } from "..";
import Stars from "../App/Stars";
import HView from "../App/HView";
import { FontAwesome5 } from "@expo/vector-icons";
import Badge from "../App/Badge";
import { colors } from "../../themes/Theme";

interface Props {
  banner: string;
  title: string;
  games: number;
}

export default function Genre({ banner, title, games }: Props) {
  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.image}
      source={{
        uri: banner,
      }}
    >
      <BlurView
        intensity={50}
        style={{
          height: 75,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ paddingTop: 5 }}>
          {/* <HView style={{ paddingBottom: 5 }}>

          </HView> */}

          <Text variant="heading3" style={styles.text}>
            {title}
          </Text>
          <Text
            variant="body"
            style={[styles.text, { color: colors["grey.200"] }]}
          >
            {games.toLocaleString()} games
          </Text>
        </View>
      </BlurView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#030937",
    justifyContent: "flex-end",
    height: 200,
    width: 200,
    marginBottom: 40,
    marginRight: 10,
    textAlign: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  image: {
    borderRadius: 20,
    height: 200,
    width: 200,
  },
  text: {
    maxWidth: 300,
  },
});
