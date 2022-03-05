import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { Text } from "..";
import { TouchableOpacity } from "react-native-gesture-handler";

interface GameProps {
  name: String;
  image: String;
  action: any;
}

export default function Game({ name, image, action }: GameProps) {
  return (
    //@ts-ignore
    <TouchableOpacity onPress={action}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          //@ts-ignore
          source={image}
        />
        <Text variant="heading3" style={styles.text}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 345,
    marginBottom: 40,
    textAlign: "center",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 345,
    borderRadius: 10,
  },
  text: {
    paddingTop: 2,
  },
});
