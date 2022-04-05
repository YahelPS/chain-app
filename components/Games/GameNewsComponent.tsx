import moment from "moment";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

import { Text } from "..";
import CachedImage from "../App/CachedImage";
import { BlurView } from "expo-blur";
import HView from "../App/HView";

interface GameNewsComponentType {
  title: string;
  image: string;
  description: string;
  url: string;
  titleLines?: number;
  date: string;
}
export default function GameNewsComponent({
  title,
  image,
  description,
  url,
  titleLines = 2,
  date,
}: GameNewsComponentType) {
  return (
    //@ts-ignore
    <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync(url)}>
      <View style={styles.container}>
        <CachedImage style={styles.image} uri={image} />
        <View
          style={{
            position: "absolute",
            left: 5,
            top: 5,
            paddingLeft: 5,
            borderRadius: 5,
            paddingRight: 5,
          }}
        >
          {date && (
            <Text variant="body" style={{ color: "yellow" }}>
              {moment(date).fromNow()}
            </Text>
          )}
        </View>
        <BlurView
          style={{
            position: "absolute",
            bottom: -20,
            width: "100%",
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            paddingLeft: 5,
            height: 110,
          }}
        >
          <Text
            variant="heading4"
            style={styles.text}
            numberOfLines={titleLines}
          >
            {title}
          </Text>
          <Text variant="body" style={styles.text} numberOfLines={2}>
            {description}
          </Text>
        </BlurView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 300,
    width: 300,
    marginBottom: 40,
    marginRight: 10,
    textAlign: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 20,
    height: 300,
    width: 300,
  },
  text: {
    padding: 5,
    maxWidth: 300,
  },
});
