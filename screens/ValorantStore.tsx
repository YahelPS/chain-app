import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  GetInventory,
  GetUsername,
  GetWallet,
  StoreItems,
  UserInfo,
} from "../apis/Valorant";
import { Text } from "../components";
import ValorantBundle from "../components/Valorant/ValorantBundle";
import Currency from "../components/Valorant/ValorantCurrency";
import HView from "../components/App/HView";
import ValorantSkin from "../components/Valorant/ValorantSkin";

interface ValorantStoreProps {
  route: any;
}

export default function ValorantStore({ route }: ValorantStoreProps) {
  const [storeItems, setStoreItems] = useState<any>(null);
  const [userWallet, setUserWallet] = useState<any>(null);
  const [username, setUsername] = useState<any>(null);
  const [inventory, setInventory] = useState<any>(null);
  const { store, headers } = route.params;

  //@ts-ignore
  useEffect(async () => {
    setStoreItems(await StoreItems(store));
    setUserWallet(await GetWallet(headers));
    const puuid = await UserInfo(headers);
    setUsername(await GetUsername(puuid.sub));
    setInventory(await GetInventory(headers, puuid.sub));
  }, []);

  if (!storeItems || !userWallet || !username || !inventory) return null;

  return (
    <View style={styles.container}>
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
      <ValorantBundle
        image={storeItems.bundle.data.displayIcon}
        name={storeItems.bundle.data.displayName}
        time={moment(storeItems.bundleTimeLeft * 1000).format("DD:HH:MM:SS")}
        video={storeItems.bundle.data.streamedVideo}
      />
      <Text>
        <Text variant="heading3">Weapon Skins </Text>
        <Text variant="valorantTime">
          {moment(storeItems.itemsTimeLeft * 1000).format("HH:MM:SS")}
        </Text>
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
            time={moment(storeItems.itemsTimeLeft * 1000).format("HH:MM:SS")}
            video={item.data.streamedVideo}
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
            time={moment(storeItems.itemsTimeLeft * 1000).format("HH:MM:SS")}
            video={item.data.streamedVideo}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
