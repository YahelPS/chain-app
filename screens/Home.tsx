import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Text } from "../components";
import AppHeader from "../components/App/AppHeader";
import GameNews from "../components/Games/GameNews";

async function formatFetch(url: string, formatSettings: any = (e: any) => e) {
  let defData = null;
  const resp = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
    },
  }).then((res) => res.json());
  return defData ? defData : formatSettings(resp);
}

export default function HomeScreen() {
  const games = {
    Fortnite: false,
    Minecraft: true,
    Valorant: true,
    "League of Legends": false,
    "Apex Legends": true,
  };

  const [news, setNews] = useState<{ game: string; news: [] }[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);
  // @ts-ignore
  useEffect(async () => {
    try {
      const fetchedNews = await axios.get(
        "https://valorant-api.vladzich.repl.co/news"
      );

      setNews(fetchedNews.data);
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
        An error occurred while fetching news.
        <Text variant="body">{`\nPlease try again later.`}</Text>
      </Text>
    );

  if (news.length > 0)
    return (
      <ScrollView style={{ padding: 20 }}>
        {news
          //@ts-ignore
          .sort((a, b) => Number(games[b.game]) - Number(games[a.game]))
          .map((gameNews: any) => (
            <GameNews
              game={gameNews.game}
              data={gameNews.data}
              key={gameNews.game}
            />
          ))}
      </ScrollView>
    );
  return <ActivityIndicator color="white" />;
}
