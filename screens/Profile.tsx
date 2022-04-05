import { Feather, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppAuth from "expo-app-auth";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { IconButton } from "react-native-paper";
import Toast from "react-native-toast-message";
import { DiscordUser } from "../@types/discord";
import { getDiscordUser, getUser } from "../apis/Discord";
import { Text } from "../components";
import AppHeader from "../components/App/AppHeader";
import Background from "../components/App/Background";
import Badge from "../components/App/Badge";
import ButtonComponent from "../components/App/ButtonComponent";
import CachedImage from "../components/App/CachedImage";
import HView from "../components/App/HView";
import GameBanner from "../components/Games/GameBanner";
import { colors } from "../themes/Theme";

export const discordConfig = {
  clientId: "950026729311834113",
  clientSecret: "UcYxVXDx6ny5hSdjhT8T1aEHB76ROnei",
  scopes: ["identify", "guilds"],
  serviceConfiguration: {
    authorizationEndpoint: "https://discordapp.com/api/oauth2/authorize",
    tokenEndpoint: "https://discordapp.com/api/oauth2/token",
    revocationEndpoint: "https://discordapp.com/api/oauth2/token/revoke",
  },
};

export default function Profile({ navigation }: { navigation: any }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="cog"
          color={colors["grey.100"]}
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("Settings")}
        />
      ),
    });
  }, []);

  async function auth() {
    //@ts-ignore
    let authState: { accessToken: string } = await AppAuth.authAsync(
      //@ts-ignore
      discordConfig
    ).catch((e) => {
      Toast.show({
        type: "error",
        text1: "Couldn't log in with Discord",
        text2: "Error code number " + e.code,
      });
    });
    const discordUser: DiscordUser = await getUser(authState.accessToken);
    AsyncStorage.setItem("discordUser", JSON.stringify(discordUser));
    setUser(discordUser);
  }

  const [user, setUser] = useState<DiscordUser>();

  //@ts-ignore
  useEffect(async () => {
    setUser(JSON.parse(await getDiscordUser()));
  }, []);
  const avatar = !!user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    : "https://i.pinimg.com/564x/d0/6b/00/d06b009a62bfc43cb2ef3a626ba84b48.jpg";
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <HView>
        <View style={{ alignItems: "center" }}>
          <CachedImage
            uri={avatar}
            style={{ height: 100, width: 100, borderRadius: 50 }}
          />
          <Text variant="heading2">{user?.username ?? "Guest"}</Text>
          {/* <HView style={{ paddingVertical: 10 }}>
            <Badge
              text="Admin"
              icon={<FontAwesome5 name="crown" />}
              color={colors["primary.200"]}
            />
            <Badge
              text="Developer"
              icon={<FontAwesome5 name="code" />}
              color={colors["primary.200"]}
            />
            <Badge
              text="Supporter"
              icon={<FontAwesome5 name="envelope" solid />}
              color={colors["primary.200"]}
            />
          </HView> */}
        </View>
      </HView>
      {!!user?.username && (
        <HView style={{ paddingTop: 2 }}>
          <FontAwesome5
            name="discord"
            color="white"
            size={14}
            style={{ marginTop: 4, paddingRight: 5 }}
          />
          <Text variant="heading4">{`${user?.username ?? ""}#${
            user?.discriminator ?? ""
          }`}</Text>
        </HView>
      )}
      {/* <ButtonComponent
        title="game selection"
        onPress={() => navigation.navigate("GameSelect")}
      /> */}
      <View style={{ paddingTop: 20 }}>
        <Text variant="heading2" style={{ paddingLeft: 10, paddingBottom: 5 }}>
          Your Library
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <GameBanner
            game="Valorant"
            source={require("../assets/games/valorant-banner.png")}
            liked
          />
          <GameBanner
            game="Apex Legends"
            source={require("../assets/games/apex-banner.png")}
            liked
          />
          <GameBanner
            game="Fortnite"
            source={require("../assets/games/fortnite-banner.png")}
            liked
          />
        </ScrollView>
      </View>

      <View style={{ bottom: 50, position: "absolute" }}>
        <ButtonComponent
          variant="discord"
          title="Login with Discord"
          icon={<FontAwesome5 name="discord" color="white" size={14} />}
          onPress={auth}
        />
      </View>
    </View>
  );
}
