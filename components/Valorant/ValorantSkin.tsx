import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Text } from "..";
import { Video } from "expo-av";

interface SkinProps {
  image: string;
  name: string;
  time: string;
  video: string;
}

export default function ValorantSkin({ image, name, time, video }: SkinProps) {
  const player = React.useRef<any>(null);
  return (
    <TouchableOpacity
      onPress={() => {
        player.current.presentFullscreenPlayer();
        player.current.playAsync();
      }}
      style={{
        ...styles.container,
        backgroundColor: "#00958733",
        borderRadius: 8,
      }}
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
        <Text variant="valorantTitle" style={{ fontSize: 20 }}>
          {name}
        </Text>
      </View>
      <Image
        source={{
          uri: image,
        }}
        style={{
          height: 40,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    position: "relative",
    height: 175,
    width: 175,
    // alignItems: "center",
    justifyContent: "center",
  },
  texts: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    left: 20,
    maxWidth: 150,
  },
});
