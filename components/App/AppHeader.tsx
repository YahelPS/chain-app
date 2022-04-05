import { Feather, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { AsyncStorage, Image, TouchableOpacity, View } from "react-native";
import { DiscordUser } from "../../@types/discord";
import { getDiscordUser, getUser } from "../../apis/Discord";
import { colors, Text } from "../../themes/Theme";
import CachedImage from "./CachedImage";
import HView from "./HView";
import * as AppAuth from "expo-app-auth";

import Toast from "react-native-toast-message";
import { discordConfig } from "../../screens/Profile";

export default function AppHeader() {
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
    const cachedUser: DiscordUser = JSON.parse(await getDiscordUser());
    setUser(cachedUser);
  });
  return (
    <View style={{ marginTop: 30, marginHorizontal: 15 }}>
      {/* <View style={{ position: "absolute" }}>
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
      </View> */}
      <View
        style={{
          position: "absolute",
          marginTop: 30,
          marginLeft: 10,
        }}
      >
        <HView>
          {user?.avatar && (
            <CachedImage
              uri={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`}
              style={{
                height: 50,
                width: 50,
                borderRadius: 10,
              }}
            />
          )}
          <View style={{ paddingLeft: 10 }}>
            {user?.username ? (
              <View>
                <Text variant="secondary">Welcome back,</Text>
                <Text variant="subheading">{user.username}</Text>
              </View>
            ) : (
              <View>
                <Text variant="subheading">Welcome back</Text>
                <TouchableOpacity onPress={auth}>
                  <HView style={{ alignItems: "center" }}>
                    <FontAwesome5
                      name="discord"
                      size={10}
                      color={colors.discord}
                      style={{ paddingRight: 5 }}
                    />
                    <Text variant="secondary" color="discord">
                      Login with Discord
                    </Text>
                  </HView>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </HView>
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          margin: 30,
          marginHorizontal: 0,
          alignSelf: "flex-end",
          borderWidth: 1,
          borderColor: colors["grey.200"],
          borderRadius: 10,
        }}
        // onPress={() => }
      >
        <Feather name="menu" color={colors["grey.200"]} size={25} />
      </TouchableOpacity>
    </View>
  );
}
