import { View, Text, Platform, Image } from "react-native";
import { Image as ImageCache } from "react-native-expo-image-cache";
import React from "react";

export default function CachedImage(props: any) {
  if (Platform.OS === "ios") {
    return <ImageCache {...props} />;
  } else {
    return <Image {...props} source={{ uri: props?.uri }} />;
  }
}
