import { View, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { Text } from "..";
import Stars from "../App/Stars";
import HView from "../App/HView";
import { FontAwesome5 } from "@expo/vector-icons";
import Badge from "../App/Badge";
import { colors } from "../../themes/Theme";

interface Props {
  banner: string;
  title: string;
  platforms: { slug: string }[] | any;
  genres: any;
  stars: number;
}
const platformIcon = {
  playstation: "playstation",
  xbox: "xbox",
  pc: "desktop",
  mac: "apple",
  android: "android",
  ios: "mobile",
  linux: "mobile",
  nintendo: "gamepad",
};
export default function NewGame({
  banner,
  platforms,
  stars,
  title,
  genres,
}: Props) {
  return (
    <ImageBackground
      style={styles.container}
      imageStyle={styles.image}
      source={{
        uri: banner,
      }}
    >
      <BlurView
        intensity={50}
        style={{
          height: 130,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <View style={{ paddingTop: 5 }}>
          {/* <HView style={{ paddingBottom: 5 }}>

          </HView> */}
          <HView style={{ alignItems: "center" }}>
            {genres.map((genre: any) => (
              <View style={{ paddingRight: 5 }}>
                <Badge
                  text={genre.name}
                  color={colors["primary.500"]}
                  key={genre.slug}
                />
              </View>
            ))}
            {platforms.map((platform: any) => (
              <View style={{ paddingRight: 10 }}>
                <FontAwesome5
                  //@ts-ignore
                  name={platformIcon[platform.platform.slug]}
                  color="white"
                  size={15}
                  key={platform.platform.slug}
                />
              </View>
            ))}
          </HView>

          <Text variant="heading3" style={styles.text}>
            {title}
          </Text>
          <Stars starCount={stars} />
        </View>
      </BlurView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#030937",
    justifyContent: "flex-end",
    height: 320,
    width: 300,
    marginBottom: 40,
    marginRight: 10,
    textAlign: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  image: {
    borderRadius: 20,
    height: 320,
    width: 300,
  },
  text: {
    maxWidth: 300,
  },
});
