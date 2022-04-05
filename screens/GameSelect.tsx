import { View, ScrollView, FlatList, Dimensions } from "react-native";
import React from "react";
import ButtonComponent from "../components/App/ButtonComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import GameBanner from "../components/Games/GameBanner";
import { Text } from "../components";
import AppHeader from "../components/App/AppHeader";

export default function GameSelect({ navigation }: { navigation: any }) {
  const games = [
    { game: "Valorant", image: require("../assets/games/valorant-banner.png") },
    { game: "Apex Legends", image: require("../assets/games/apex-banner.png") },
    { game: "Fortnite", image: require("../assets/games/fortnite-banner.png") },
    { game: "Valorant", image: require("../assets/games/valorant-banner.png") },
    { game: "Apex Legends", image: require("../assets/games/apex-banner.png") },
    { game: "Fortnite", image: require("../assets/games/fortnite-banner.png") },
    { game: "Valorant", image: require("../assets/games/valorant-banner.png") },
    { game: "Apex Legends", image: require("../assets/games/apex-banner.png") },
    { game: "Fortnite", image: require("../assets/games/fortnite-banner.png") },
    { game: "Valorant", image: require("../assets/games/valorant-banner.png") },
    { game: "Apex Legends", image: require("../assets/games/apex-banner.png") },
    { game: "Fortnite", image: require("../assets/games/fortnite-banner.png") },
    { game: "Valorant", image: require("../assets/games/valorant-banner.png") },
    { game: "Apex Legends", image: require("../assets/games/apex-banner.png") },
    { game: "Fortnite", image: require("../assets/games/fortnite-banner.png") },
  ];

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <ButtonComponent
        title="game selection"
        onPress={() => navigation.goBack()}
      />
      <Text variant="title">What games do you like?</Text>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        data={games}
        renderItem={(item) => (
          <GameBanner game={item.item.game} source={item.item.image} liked />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={Math.floor(Dimensions.get("window").width / 170)}
      />
    </SafeAreaView>
  );
}
