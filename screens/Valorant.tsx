import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  axiosCache,
  GetMatchHistory,
  Headers,
  UserStore,
} from "../apis/Valorant";
import { Text } from "../components";
import AppHeader from "../components/App/AppHeader";
import ButtonComponent from "../components/App/ButtonComponent";
import WebModal from "../components/App/WebModal";

export default function ValorantScreen({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);

  //@ts-ignore
  useEffect(async () => {
    const cachedStore: any = Object.entries(
      //@ts-ignore
      axiosCache.store.store
    ).find(([key]) => key.includes("storefront"));

    if (/*!cachedStore?.[0]*/ true) return;
    navigation.replace("ValorantAccount", {
      store: JSON.parse(cachedStore[1]).data.data,
    });
  }, []);

  async function loginStore(accessToken: string) {
    const headers = await getHeaders(accessToken);
    const store = await UserStore(headers);
    setLoading(false);

    navigation.replace("ValorantStore", { store, headers });
  }

  async function loginMatches(accessToken: string) {
    const headers = await getHeaders(accessToken);
    const matches = await GetMatchHistory(headers);
    setLoading(false);

    navigation.replace("ValorantMatches", { matches: matches, headers });
  }

  async function getHeaders(accessToken: string) {
    setLoading(true);
    const headers = await Headers({ accessToken });
    setLoading(false);
    if (headers.error) return headers;
    setLoading(true);
    return headers;
  }

  return (
    <ScrollView
      contentContainerStyle={{ padding: 20 }}
      keyboardDismissMode="on-drag"
      // scrollEnabled={false}
    >
      <Text variant="heading1">
        Check your Valorant store right on your phone!
      </Text>
      <View
        style={{
          marginTop: 30,
          padding: 10,
          width: 220,
          backgroundColor: "#2d3e4c",
          borderColor: "white",
          borderRadius: 20,
          borderWidth: 1,
        }}
      >
        <Image
          source={require("../assets/valorant_store_promo.png")}
          style={{
            height: 300,
            width: 200,
          }}
        />
      </View>
      <View
        style={{
          paddingTop: 15,
          flexDirection: "row",
        }}
      >
        {/* <WebModal callback={loginStore} />
        <WebModal callback={loginMatches} /> */}
        <WebModal
          callback={(accessToken: string) => {
            navigation.replace("ValorantAccount", { accessToken });
          }}
        />
      </View>
      <View style={{ paddingTop: 50 }}>
        {loading && <ActivityIndicator color="white" />}
      </View>
    </ScrollView>
  );
}
