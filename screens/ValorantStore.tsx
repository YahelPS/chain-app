import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  GetInventory,
  GetUsername,
  GetWallet,
  Headers,
  StoreItems,
  UserInfo,
  UserStore,
} from "../apis/Valorant";
import { Text } from "../components";
import ValorantBundle from "../components/Valorant/ValorantBundle";
import Currency from "../components/Valorant/ValorantCurrency";
import HView from "../components/App/HView";
import ValorantSkin from "../components/Valorant/ValorantSkin";
import Timer from "../components/App/Timer";
import AppHeader from "../components/App/AppHeader";
import Background from "../components/App/Background";

interface ValorantStoreProps {
  route: any;
}

export default function ValorantStore({ route }: ValorantStoreProps) {
  const [storeItems, setStoreItems] = useState<any>(null);
  const [userWallet, setUserWallet] = useState<any>(null);
  const [username, setUsername] = useState<any>(null);
  const [inventory, setInventory] = useState<any>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  //@ts-ignore
  useEffect(async () => {
    try {
      const headers = await Headers({ accessToken: route.params.accessToken });
      const store = await UserStore(headers);
      setStoreItems(await StoreItems(store));
      console.log(storeItems);
      setUserWallet(await GetWallet(headers));
      console.log("user wallet");
      const puuid = await UserInfo(headers);
      console.log("user info");
      setUsername(await GetUsername(puuid.sub));
      console.log("username");
      setInventory(await GetInventory(headers, puuid.sub));
      console.log("inventory");
    } catch {
      setHasError(true);
    }
  }, []);

  if (hasError)
    return (
      <Text
        variant="heading4"
        style={{ alignSelf: "center", textAlign: "center", paddingTop: 10 }}
      >
        An error occurred while fetching user store.
        <Text variant="body">{`\nPlease try again later.`}</Text>
      </Text>
    );

  if (!storeItems || !userWallet || !username || !inventory)
    return <ActivityIndicator color="white" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HView
        style={{
          alignSelf: "flex-start",
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={{
            uri: `https://media.valorant-api.com/playercards/${inventory.Identity.PlayerCardID}/smallart.png`,
            height: 20,
            width: 20,
          }}
          style={{ marginTop: 2, marginRight: 5, borderRadius: 16 }}
        />
        <Text variant="heading4">{`${username[0].GameName}#${username[0].TagLine}`}</Text>
        <Currency amount={Object.values(userWallet.Balances)[0]} type="VP" />
        <Currency
          amount={Object.values(userWallet.Balances)[1]}
          type="Radianite"
        />
      </HView>
      {/* <HView
        style={{
          paddingHorizontal: 10,
          paddingBottom: 5,
          alignSelf: "flex-start",
        }}
      >
        <Image
          source={{
            uri: `https://media.valorant-api.com/playercards/${inventory.Identity.PlayerCardID}/smallart.png`,
            height: 100,
            width: 100,
          }}
          style={{ borderRadius: 50 }}
        />
        <View style={{ paddingLeft: 5, justifyContent: "center" }}>
          <HView style={{ alignItems: "center" }}>
            <Text variant="heading1">psyxush</Text>
          </HView>
          <HView>
            <Text variant="subheading" color="grey.100">
              #9850
            </Text>
          </HView>
          <View style={{ position: "absolute", right: -100 }}>
            <Currency type="VP" amount={1850} />
            <Currency type="VP" amount={1850} />
          </View>
        </View>
      </HView> */}
      <ValorantBundle
        image={storeItems.bundle.data.displayIcon}
        name={storeItems.bundle.data.displayName}
        time={storeItems.bundleTimeLeft}
        video={storeItems.bundle.data.streamedVideo}
      />
      <Text style={{ marginTop: 5 }}>
        <Text variant="heading3">Weapon Skins </Text>
        <Timer time={storeItems.itemsTimeLeft} />
      </Text>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        {storeItems.items.slice(0, 2).map((item: any) => (
          <ValorantSkin
            image={item.data.displayIcon}
            name={item.data.displayName}
            time={storeItems.itemsTimeLeft}
            video={item.data.streamedVideo}
            uuid={item.data.uuid}
            key={item.data.displayName}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {storeItems.items.slice(2, 4).map((item: any) => (
          <ValorantSkin
            image={item.data.displayIcon}
            name={item.data.displayName}
            time={storeItems.itemsTimeLeft}
            video={item.data.streamedVideo}
            uuid={item.data.uuid}
            key={item.data.displayName}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
});
