import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GetInventory, Headers, UserInfo } from "../apis/Valorant";
import { Text } from "../components";
import CachedImage from "../components/App/CachedImage";
import HView from "../components/App/HView";
import Nav from "../components/App/Nav";
import TopTabs from "../components/App/TopTabs";
import ValorantMatchDetails from "./ValorantMatchDetails";
import ValorantMatches from "./ValorantMatches";
import ValorantStore from "./ValorantStore";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors, theme } from "../themes/Theme";
import AppHeader from "../components/App/AppHeader";
import Background from "../components/App/Background";

export default function ValorantAccount({
  navigation,
  route,
}: {
  route: any;
  navigation: any;
}) {
  const [userInfo, setUserInfo] = useState<any>();
  const [userInventory, setUserInventory] = useState<any>();

  async function store() {
    navigation.navigate("ValorantStore", {
      accessToken: route.params.accessToken,
    });
  }

  async function matches() {
    navigation.navigate("ValorantMatches", {
      accessToken: route.params.accessToken,
    });
  }

  //@ts-ignore
  // useEffect(async () => {
  //   const headers = await Headers(route.params.accessToken);
  //   console.log(headers);

  //   setUserInfo(await UserInfo(headers));
  //   setUserInventory(await GetInventory(headers, userInfo.sub));
  //   console.log(userInventory);
  // }, []);

  // if (!userInventory || !userInfo) return <ActivityIndicator />;
  const tabs = [
    {
      label: "Store",
      id: 0,
      screen: (
        <ValorantStore
          route={{ params: { accessToken: route.params.accessToken } }}
        />
      ),
    },
    {
      label: "Store",
      id: 1,
      screen: (
        <ValorantStore
          route={{ params: { accessToken: route.params.accessToken } }}
        />
      ),
    },
    {
      label: "Matches",
      id: 1,
      screen: (
        <ValorantMatches
          navigation={navigation}
          route={{ params: { accessToken: route.params.accessToken } }}
        />
      ),
    },
  ];
  const [tab, setTab] = useState(0);
  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{ flex: 1 }}>
      {/* <TopTabs onNav={setTab} /> */}
      {/* {tabs[tab].screen} */}
      {/* <Nav title="Store" variant="valorant" onPress={store} />
      <Nav title="Match History" variant="valorant" onPress={matches} /> */}

      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: "#200f36",
          // paddingTop: 10,
        }}
        tabBarOptions={{
          style: {
            backgroundColor: "transparent",
            borderBottomColor: "white",
            borderBottomWidth: 1,
            marginHorizontal: 10,
            // marginTop: -50,
          },
          labelStyle: {
            ...theme.textVariants.heading4,
            textTransform: "none",
            color: "white",
            margin: 0,
          },
          indicatorStyle: { backgroundColor: "white", height: 2 },
        }}
      >
        <Tab.Screen
          name="Store"
          component={ValorantStore}
          initialParams={{ accessToken: route.params.accessToken }}
        />
        <Tab.Screen
          name="Match History"
          component={ValorantMatches}
          initialParams={{ accessToken: route.params.accessToken }}
        />
      </Tab.Navigator>
    </View>
  );
}
