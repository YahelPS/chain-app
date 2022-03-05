import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "..";
import { Video } from "expo-av";

interface BundleProps {
  image: string;
  name: string;
  time: string;
  video: string;
}

export default function ValorantBundle({
  image,
  name,
  time,
  video,
}: BundleProps) {
  const player = React.useRef<any>(null);
  return (
    <TouchableOpacity
      onPress={() => {
        player.current.presentFullscreenPlayer();
        player.current.playAsync();
      }}
      style={{ position: "relative" }}
    >
      <Video
        ref={player}
        source={{
          uri: video,
        }}
        useNativeControls
        style={{ width: 320, height: 180, display: "none" }}
      />
      <View style={styles.texts}>
        <Text variant="valorantTime">{time}</Text>
        <Text variant="valorantTitle">{name}</Text>
      </View>
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 412,
          height: 170,
          transform: [{ scale: 0.9 }],
          borderRadius: 8,
        }}
      />
    </TouchableOpacity>
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
});
