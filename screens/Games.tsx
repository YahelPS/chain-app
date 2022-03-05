import React from "react";
import { FlatList, View } from "react-native";
import Game from "../components/Games/Game";

export default function GamesScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={[
          {
            name: "Valorant",
            image: require("../assets/VALORANT_Ep4_A1_Social_Updates_NeonContent_Stack_Thumbnail.png"),
          },
          {
            name: "Fortnite",
            image: require("../assets/19BR_KeyArt_EGS_Launcher_Blade_2560x1440_2560x1440-0c719814e3356a4726560c70f0462e7b.jpg"),
          },
        ]}
        renderItem={({ item }) => (
          <Game
            name={item.name}
            image={item.image}
            action={() => navigation.navigate(item.name)}
          />
        )}
        //@ts-ignore
        keyExtractor={(_, index) => index}
        decelerationRate={0}
        showsVerticalScrollIndicator={false}
        snapToAlignment={"center"}
      />
    </View>
  );
}
