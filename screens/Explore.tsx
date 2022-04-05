import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../components";
import AppHeader from "../components/App/AppHeader";
import HView from "../components/App/HView";
import Genre from "../components/Games/Genre";
import NewGame from "../components/Games/NewGame";
import games from "../games.json";
import genres from "../genres.json";

export default function Explore({ navigation }: { navigation: any }) {
  const tt = {
    backgroundColor: "#200f36",
    paddingHorizontal: 10,
    flex: 1,
  };
  return (
    <SafeAreaView style={{ ...tt }}>
      <View style={tt}>
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
        <Text variant="subheading">Popular</Text>
        <ScrollView horizontal style={{ paddingTop: 0 }}>
          {games.results.map((game) => (
            <NewGame
              banner={game.background_image}
              title={game.name}
              platforms={game.parent_platforms}
              stars={game.rating}
              genres={game.genres}
              key={game.name}
            />
          ))}
        </ScrollView>
        <HView
          style={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text variant="subheading">Top categories</Text>
          <TouchableOpacity>
            <Text variant="secondary" style={{ right: 0 }}>
              View All
            </Text>
          </TouchableOpacity>
        </HView>
        <ScrollView horizontal style={{ paddingTop: 5 }}>
          {genres.results.slice(0, 5).map((genre) => (
            <Genre
              banner={genre.image_background}
              title={genre.name}
              games={genre.games_count}
              key={genre.name}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
