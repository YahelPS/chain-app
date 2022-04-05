import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://discordapp.com/api/",
});

export async function getUser(accessToken: string) {
  const resp = await api.get("/users/@me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return resp.data;
}

export async function getDiscordUser() {
  const data = await AsyncStorage.getItem("discordUser").catch(() => {});
  return data || "{}";
}
