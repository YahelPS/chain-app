import React from "react";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import BottomSheet from "@gorhom/bottom-sheet";

import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";
// Components
import Navigation from "./components/Navigation";
// Theme
import { theme, darkTheme } from "./themes/Theme";
import { useFonts } from "expo-font";

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Mulish-Light": require("./assets/fonts/Mulish-Light.ttf"),
    "Mulish-Regular": require("./assets/fonts/Mulish-Regular.ttf"),
    "Mulish-Medium": require("./assets/fonts/Mulish-Medium.ttf"),
    "Mulish-SemiBold": require("./assets/fonts/Mulish-SemiBold.ttf"),
    "Mulish-Bold": require("./assets/fonts/Mulish-Bold.ttf"),
    "Mulish-ExtraBold": require("./assets/fonts/Mulish-ExtraBold.ttf"),
    Mulish: require("./assets/fonts/Mulish-VariableFont_wght.ttf"),
    Valorant: require("./assets/fonts/Valorant.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AppearanceProvider>
      <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
      <ThemeProvider theme={colorScheme === "light" ? theme : darkTheme}>
        <Navigation theme={colorScheme} />
      </ThemeProvider>
    </AppearanceProvider>
  );
}
