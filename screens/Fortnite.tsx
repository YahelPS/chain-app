import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native";
import "textras";
import { Text } from "../components";
import AppHeader from "../components/App/AppHeader";
import FortniteBundle from "../components/Fortnite/FortniteBundle";
import FortniteSkin from "../components/Fortnite/FortniteSkin";

export default function Fortnite() {
  const [res, setRes] = useState<any>();
  const [hasError, setHasError] = useState<boolean>(false);
  //@ts-ignore
  useEffect(async () => {
    try {
      setRes(
        await fetch("https://fortnite-api.com/v2/shop/br").then((resp) =>
          resp.json()
        )
      );
    } catch {
      setHasError(true);
    }
  }, []);
  if (!res) return <ActivityIndicator color="white" />;
  const { featured, daily, specialFeatured } = res.data;

  if (hasError)
    return (
      <Text
        variant="heading4"
        style={{ alignSelf: "center", textAlign: "center", paddingTop: 10 }}
      >
        An error occurred while fetching daily shop.
        <Text variant="body">{`\nPlease try again later.`}</Text>
      </Text>
    );
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      {featured.entries
        .filter((item: any) => item.bundle && item.items.length > 1)
        .map((item: any, index: number) => (
          <FortniteBundle
            key={index.toString()}
            image={item.newDisplayAsset?.materialInstances[0].images.Background}
            items={item.items}
            //@ts-ignore
            name={item.bundle.name.wordCap()}
            cost={item.finalPrice}
          />
        ))}
      <Text variant="heading2">Featured</Text>
      <FlatList
        data={featured.entries.filter((item: any) => !item.bundle)}
        renderItem={(item) => (
          <FortniteSkin
            image={
              item.item.newDisplayAsset?.materialInstances[0].images.Background
            }
            name={item.item.items[0].name}
            cost={item.item.finalPrice}
          />
        )}
        keyExtractor={(_, i) => i.toString()}
        numColumns={2}
      />
      <Text variant="heading2">Daily</Text>
      {daily.entries
        .filter((item: any) => item.bundle && item.items.length > 1)
        .map((item: any, index: number) => (
          <FortniteBundle
            key={index}
            image={item.newDisplayAsset?.materialInstances[0].images.Background}
            items={item.items}
            //@ts-ignore
            name={item.bundle.name.wordCap()}
            cost={item.finalPrice}
          />
        ))}
      <FlatList
        data={daily.entries.filter((item: any) => !item.bundle)}
        renderItem={(item) => (
          <FortniteSkin
            image={
              item.item.newDisplayAsset?.materialInstances[0].images.Background
            }
            name={item.item.items[0].name}
            cost={item.item.finalPrice}
          />
        )}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
      />
      <Text variant="heading2">Special Featured</Text>
      {specialFeatured.entries
        .filter((item: any) => item.bundle && item.items.length > 1)
        .map((item: any, index: number) => (
          <FortniteBundle
            key={index}
            image={item.newDisplayAsset?.materialInstances[0].images.Background}
            items={item.items}
            //@ts-ignore
            name={item.bundle.name.wordCap()}
            cost={item.finalPrice}
          />
        ))}
      <FlatList
        data={specialFeatured.entries.filter((item: any) => !item.bundle)}
        renderItem={(item) => (
          <FortniteSkin
            image={
              item.item.newDisplayAsset?.materialInstances[0].images
                .Background || item.item.items[0].images.featured
            }
            name={item.item.items[0].name}
            cost={item.item.finalPrice}
          />
        )}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
      />
    </ScrollView>
  );
}
