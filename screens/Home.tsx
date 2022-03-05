import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Headers } from "../apis/Valorant";
import GameNews from "../components/Games/GameNews";

async function formatFetch(url: string, formatSettings: any = (e: any) => e) {
  const resp = await fetch(url).then((res) => res.json());
  return formatSettings(resp);
}

export default function HomeScreen() {
  const [valorantData, setValorantData] = useState(null);
  const [fortniteData, setFortniteData] = useState(null);
  // @ts-ignore
  useEffect(async () => {
    const valorantNews = await formatFetch(
      "https://playvalorant.com/page-data/en-us/news/page-data.json",
      (e: any) =>
        e.result.data.contentstackNews.featured_news.reference.map(
          //@ts-ignore
          (newsItem) =>
            Object({
              ...newsItem,
              image: newsItem.banner.url,
              url:
                newsItem.external_link ||
                `https://playvalorant.com/en-us/${newsItem.url.url}`,
            })
        )
    );
    setValorantData(valorantNews);
    const fortniteNews = await formatFetch(
      "https://www.epicgames.com/fortnite/api/blog/getPosts?category=&postsPerPage=5&offset=0&locale=en-US&rootPageSlug=blog",
      (e: any) =>
        e.blogList.map((newsItem: any) =>
          Object({
            title: newsItem.gridTitle || newsItem.title,
            image: newsItem.image,
            description: "",
            url: `https://www.epicgames.com/fortnite/en-US${newsItem.urlPattern}`,
            date: newsItem.date,
          })
        )
    );

    setFortniteData(fortniteNews);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {valorantData ? <GameNews game="Valorant" data={valorantData} /> : null}

      {fortniteData ? (
        <GameNews game="Fortnite" data={fortniteData} titleLines={2} />
      ) : null}
    </View>
  );
}
