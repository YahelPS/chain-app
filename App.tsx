import { ThemeProvider } from "@shopify/restyle";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { LogBox } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import Toast from "react-native-toast-message";
import AppHeader from "./components/App/AppHeader";
import LoadAssets from "./components/App/LoadAssets";
// Components
import Navigation from "./components/Navigation";
// Theme
import { darkTheme, theme } from "./themes/Theme";
import { schedulePushNotification } from "./utils/Notifications";

export const fonts = {
  "Mulish-Light": require("./assets/fonts/Mulish-Light.ttf"),
  "Mulish-Regular": require("./assets/fonts/Mulish-Regular.ttf"),
  "Mulish-Medium": require("./assets/fonts/Mulish-Medium.ttf"),
  "Mulish-SemiBold": require("./assets/fonts/Mulish-SemiBold.ttf"),
  "Mulish-Bold": require("./assets/fonts/Mulish-Bold.ttf"),
  "Mulish-ExtraBold": require("./assets/fonts/Mulish-ExtraBold.ttf"),
  Mulish: require("./assets/fonts/Mulish-VariableFont_wght.ttf"),
  Valorant: require("./assets/fonts/Valorant.ttf"),
  "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
  "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
};

export default function App() {
  const colorScheme = useColorScheme();

  // useEffect(() => {
  //   Notifications.requestPermissionsAsync();
  //   const dummyDate = new Date("1 1 0 8:00 PM EST");
  //   schedulePushNotification(
  //     dummyDate,
  //     true,
  //     "valorant-store-changed",
  //     "Your Valorant store has changed!"
  //   );
  // }, []);

  return (
    <AppearanceProvider>
      <StatusBar style={/*colorScheme === "light" ? "dark" :*/ "light"} />
      <ThemeProvider theme={/*colorScheme === "light" ? theme : */ darkTheme}>
        <LoadAssets
          assets={[
            require("./assets/19BR_KeyArt_EGS_Launcher_Blade_2560x1440_2560x1440-0c719814e3356a4726560c70f0462e7b.jpg"),
            require("./assets/VALORANT_Ep4_A1_Social_Updates_NeonContent_Stack_Thumbnail.png"),
          ]}
          fonts={fonts}
        >
          <Navigation theme="dark" />
          <Toast position="bottom" />
        </LoadAssets>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
