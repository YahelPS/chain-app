import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "..";
import GameNewsComponent from "./GameNewsComponent";

export default function GameNews({
  data,
  game,
  titleLines = 1,
}: {
  data: any;
  game: string;
  titleLines?: number;
}) {
  return (
    <View>
      <Text variant="heading1">{game}</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => (
          <GameNewsComponent
            title={item.title}
            image={item.image}
            description={item.description}
            url={item.url}
            date={item.date}
            titleLines={game === "Fortnite" ? 5 : 2}
          />
        )}
        //@ts-ignore
        keyExtractor={(_, index) => index}
        showsHorizontalScrollIndicator={false}
        snapToAlignment={"center"}
      />
    </View>
  );
}
