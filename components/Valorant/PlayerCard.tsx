import moment from "moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

import { Text } from "..";
import CachedImage from "../App/CachedImage";

interface Type {
  player: any;
}
export default function PlayerCard({ player }: Type) {
  const KDA = `${player.stats.kills} / ${player.stats.deaths} / ${player.stats.assists}`;
  return (
    //@ts-ignore
    <View>
      <View style={styles.container}>
        <CachedImage
          style={styles.image}
          uri={`https://media.valorant-api.com/playercards/${player.playerCard}/largeart.png`}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            borderTopStartRadius: 20,
            borderTopEndRadius: 20,
            paddingLeft: 5,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View style={styles.text}>
            <Text variant="heading4">
              {`${player.gameName}#${player.tagLine}`}
            </Text>
            <Text variant="heading4">{KDA}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 150,
    marginBottom: 40,
  },
  image: {
    borderRadius: 20,
    height: 250,
    width: 150,
  },
  text: {
    alignItems: "center",
    padding: 10,
    maxWidth: 300,
  },
});
