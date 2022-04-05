import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, StyleSheet, View } from "react-native";
import { axiosCache, Headers, UserStore } from "../apis/Valorant";
import { Text } from "../components";
import ButtonComponent from "../components/App/ButtonComponent";
import Input from "../components/App/Input";
import ListPicker from "../components/App/ListPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../themes/Theme";
import Toast from "react-native-toast-message";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const NavigationTabs = [
  {
    id: "eu",
    name: "EU",
  },
  {
    id: "na",
    name: "NA",
  },
  {
    id: "ap",
    name: "Asia",
  },
  {
    id: "kr",
    name: "Korea",
  },
];

interface HeaderProps {
  username: string;
  password: string;
  region: string;
}

export default function ValorantScreen({ navigation }: { navigation: any }) {
  const [selectedRegion, setSelectedRegion] = useState("eu");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //@ts-ignore
  useEffect(async () => {
    // @ts-ignore
    const data = JSON.parse(await AsyncStorage.getItem("valorantData"));
    setUsername(data?.username || "");
    setPassword(data?.password || "");
    setSelectedRegion(data?.region || "eu");

    //@ts-ignore
    const cachedStore = Object.entries(axiosCache.store.store).find(([key]) => {
      return key.includes("storefront");
    });
    if (!cachedStore?.[0]) return;

    if (Object.keys(axiosCache.store).some((key) => key.includes(""))) {
      navigation.replace("ValorantStore", {
        //@ts-ignore
        store: axiosCache.store.store?.[cachedStore?.[0]].data,
      });
    }
  }, []);

  async function getHeaders({ username, password, region }: HeaderProps) {
    setLoading(true);
    const headers = await Headers({ username, password, region });
    setLoading(false);
    if (headers.error) return headers;
    setLoading(true);
    const store = await UserStore(headers);
    setLoading(false);

    navigation.replace("ValorantStore", { store, headers });

    return headers;
  }

  return (
    <ScrollView
      contentContainerStyle={{ padding: 20, alignItems: "center" }}
      keyboardDismissMode="on-drag"
      scrollEnabled={false}
    >
      <Text
        variant="heading1"
        textAlign="center"
      >{`Login to your\nValorant Account`}</Text>
      <Input
        value={username}
        label="Riot ID"
        onChangeText={setUsername}
        placeholder="egirlslayer"
        capitalize={false}
        icon={<Feather name="user" color={colors["grey.400"]} size={22} />}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        label="Riot Password"
        placeholder="*********"
        keyboardType="visible-password"
        capitalize={false}
        icon={<Feather name="lock" color={colors["grey.400"]} size={22} />}
      />
      <View style={{ alignItems: "center" }}>
        <Text variant="label">Region</Text>
        <ListPicker
          items={NavigationTabs}
          onPress={(_) => setSelectedRegion(_.id)}
          selected={selectedRegion}
          itemWidth={80}
          buttonStyle={[
            {
              backgroundColor: "transparent",
              borderColor: colors.valorant,
              marginRight: 5,
            },
          ]}
          textStyle={{
            color: colors.white,
          }}
          activeBackgroundColor={colors.valorant}
        />
      </View>
      <ButtonComponent
        title="Login"
        variant="valorant"
        disabled={loading}
        onPress={async () => {
          AsyncStorage.setItem(
            "valorantData",
            JSON.stringify({ username, password, region: selectedRegion })
          );
          const result = await getHeaders({
            username,
            password,
            region: selectedRegion,
          });
          if (result.error) {
            Toast.show({
              type: "error",
              text1: "Couldn't log you in. Please validate your info.",
              text2: "Make sure you have 2FA disabled.",
            });
          }
        }}
      />

      <View style={{ paddingTop: 50 }}>{loading && <ActivityIndicator />}</View>
    </ScrollView>
  );
}
