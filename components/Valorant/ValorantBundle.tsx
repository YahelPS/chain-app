import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import CachedImage from "../App/CachedImage";
import React, { useEffect, useState } from "react";
import { Text } from "..";
import { Video } from "expo-av";
interface BundleProps {
  image: string;
  name: string;
  time: number;
  video: string;
}

export default function ValorantBundle({
  image,
  name,
  time,
  video,
}: BundleProps) {
  const [timer, setTimer] = useState(time);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  });
  function secsToTime(secs: number) {
    let d = (secs / 8.64e4) | 0;
    let H = ((secs % 8.64e4) / 3.6e3) | 0;
    let m = ((secs % 3.6e3) / 60) | 0;
    let s = secs % 60;
    let z = (n: number) => (n < 10 ? "0" : "") + n;
    let str = `${z(H)}:${z(m)}:${z(s)}`;
    if (d < 1) return str;
    str = `${d}:${str}`;
    return str;
  }

  return (
    <TouchableOpacity style={{ position: "relative", paddingHorizontal: 10 }}>
      <View style={styles.texts}>
        <Text variant="valorantTime">{secsToTime(timer)}</Text>
        <Text variant="valorantTitle">{name}</Text>
      </View>
      <CachedImage
        uri={image}
        style={{
          width: 365,
          height: 130,
          // transform: [{ scale: 0.9 }],
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
