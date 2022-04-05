import { Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, View } from "react-native";
import ExploreScreen from "../screens/Explore";
import FortniteScreen from "../screens/Fortnite";
import GamesScreen from "../screens/Games";
import GameSelectScreen from "../screens/GameSelect";
// Screens
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import SettingsScreen from "../screens/Settings";
import ValorantScreen from "../screens/Valorant";
import ValorantAccountScreen from "../screens/ValorantAccount";
import ValorantMatchDetailsScreen from "../screens/ValorantMatchDetails";
import ValorantMatchesScreen from "../screens/ValorantMatches";
import ValorantStoreScreen from "../screens/ValorantStore";
import { colors } from "../themes/Theme";
import AppHeader from "./App/AppHeader";
import Background from "./App/Background";

const BottomTab = createBottomTabNavigator();

const GamesNavigator = createStackNavigator();

export function GamesStackScreen() {
  return (
    <GamesNavigator.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: { backgroundColor: "#200f36" },
      }}
    >
      <GamesNavigator.Screen name="Games" component={GamesScreen} />
      <GamesNavigator.Screen name="Fortnite" component={FortniteScreen} />

      <GamesNavigator.Screen name="Valorant" component={ValorantScreen} />
      <GamesNavigator.Screen
        name="ValorantStore"
        component={ValorantStoreScreen}
      />
      <GamesNavigator.Screen
        name="ValorantMatches"
        component={ValorantMatchesScreen}
      />
      <GamesNavigator.Screen
        name="ValorantMatchDetails"
        component={ValorantMatchDetailsScreen}
      />
      <GamesNavigator.Screen
        name="ValorantAccount"
        component={ValorantAccountScreen}
      />
    </GamesNavigator.Navigator>
  );
}
export default function Navigation({ theme }: { theme: String }) {
  return (
    <NavigationContainer theme={DarkTheme}>
      <BottomTab.Navigator
        options={{
          topBar: {
            animate: true,
            title: {},
            subtitle: {},
            backButton: {},
            background: {},
          },
        }}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#1f2933",
            height: 100,
            paddingTop: 10,
          },
          headerShadowVisible: false,
          header: () => <AppHeader />,
        }}
        sceneContainerStyle={{
          backgroundColor: "#200f36",
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                color={focused ? colors["primary.500"] : colors["grey.400"]}
                size={25}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Games"
          component={GamesStackScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="game-controller-outline"
                color={focused ? colors["primary.500"] : colors["grey.400"]}
                regular
                size={25}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="search"
                color={focused ? colors["primary.500"] : colors["grey.400"]}
                size={25}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                color={focused ? colors["primary.500"] : colors["grey.400"]}
                size={25}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="GameSelect"
          component={GameSelectScreen}
          options={{
            tabBarStyle: {
              display: "none",
            },

            tabBarItemStyle: { display: "none" },
            headerShown: false,
          }}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarItemStyle: { display: "none" },
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
