import React from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// Screens
import HomeScreen from "../screens/Home";
import GamesScreen from "../screens/Games";
import ValorantScreen from "../screens/Valorant";
import { Feather } from "@expo/vector-icons";
import { colors } from "../themes/Theme";
import ValorantStoreScreen from "../screens/ValorantStore";
import FortniteScreen from "../screens/Fortnite";

const BottomTab = createBottomTabNavigator();
const GamesNavigator = createStackNavigator();

export function GamesStackScreen() {
  return (
    <GamesNavigator.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: { backgroundColor: "#323f4b" },
      }}
    >
      <GamesNavigator.Screen name="Games" component={GamesScreen} />
      <GamesNavigator.Screen name="Fortnite" component={FortniteScreen} />

      <GamesNavigator.Screen name="Valorant" component={ValorantScreen} />
      <GamesNavigator.Screen
        name="ValorantStore"
        component={ValorantStoreScreen}
      />
    </GamesNavigator.Navigator>
  );
}

export default function Navigation({ theme }: { theme: String }) {
  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#1f2933",
            height: "12%",
            paddingTop: 10,
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors["grey.800"],
            borderTopWidth: 1,
            borderColor: colors["grey.400"],
            height: 150,
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            paddingLeft: 10,
            fontSize: 40,
          },
        }}
        sceneContainerStyle={{ backgroundColor: colors["grey.800"] }}
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
              <Feather
                name="plus-circle"
                color={focused ? colors["primary.500"] : colors["grey.400"]}
                size={25}
              />
            ),
            tabBarIconStyle: {},
          }}
        />
        <BottomTab.Screen
          name="Profile"
          component={HomeScreen}
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
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
