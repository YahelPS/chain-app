import { View, Text, Image } from "react-native";
import React from "react";

export default function Background(props: any) {
  return (
    <View style={{ flex: 1, position: "absolute" }}>
      <Image
        source={{
          uri:
            "https://media.discordapp.net/attachments/942427531141857340/958776926909124638/unknown.png",
        }}
        style={{
          height: 300,
          width: 300,
          position: "absolute",
          left: -160,
          bottom: "40%",
        }}
      />

      <Image
        source={{
          uri:
            "https://media.discordapp.net/attachments/942427531141857340/958777447355133972/unknown.png",
        }}
        style={{
          height: 250,
          width: 250,
          position: "absolute",
          right: -160,
          bottom: 0,
          opacity: 0.5,
        }}
      />
      {}
    </View>
  );
}
