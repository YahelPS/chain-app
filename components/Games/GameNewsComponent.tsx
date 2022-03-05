import moment from "moment";
import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { Text } from "..";

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
  titleLines = 1,
  date,
}: GameNewsComponentType) {
  return (
    //@ts-ignore
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: image,
          }}
        />
        <View
          style={{
            position: "absolute",
            left: 5,
            top: 5,
            paddingLeft: 5,
            borderRadius: 5,
            paddingRight: 5,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Text variant="body" style={{ color: "yellow" }}>
            {moment(date).fromNow()}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: -20,
            width: "100%",
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            paddingLeft: 5,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
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
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: 160,
    width: 320,
    marginBottom: 40,
    marginRight: 10,
    textAlign: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 20,
    height: 180,
    width: 320,
  },
  text: {
    padding: 5,
    maxWidth: 300,
  },
});
