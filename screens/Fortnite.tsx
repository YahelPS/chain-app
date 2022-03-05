import { View, ScrollView } from "react-native";
import React from "react";
import res from "../br.json";
import FortniteBundle from "../components/Fortnite/FortniteBundle";
import FortniteSkin from "../components/Fortnite/FortniteSkin";
import { Text } from "../components";
import "textras";
import { FlatList } from "react-native-gesture-handler";

export default function Fortnite() {
  const { featured, daily, specialFeatured } = res.data;
  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      {featured.entries
        .filter((item) => item.bundle && item.items.length > 1)
        .map((item) => (
          <FortniteBundle
            image={item.newDisplayAsset.materialInstances[0].images.Background}
            items={item.items}
            //@ts-ignore
            name={item.bundle.name.wordCap()}
            cost={item.finalPrice}
          />
        ))}
      <Text variant="heading2">Featured</Text>
      <FlatList
        data={featured.entries.filter((item) => !item.bundle)}
        renderItem={(item) => (
          <FortniteSkin
            image={
              item.item.newDisplayAsset.materialInstances[0].images.Background
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
        .filter((item) => item.bundle && item.items.length > 1)
        .map((item, index) => (
          <FortniteBundle
            key={index}
            image={item.newDisplayAsset.materialInstances[0].images.Background}
            items={item.items}
            //@ts-ignore
            name={item.bundle.name.wordCap()}
            cost={item.finalPrice}
          />
        ))}
      <FlatList
        data={daily.entries.filter((item) => !item.bundle)}
        renderItem={(item) => (
          <FortniteSkin
            image={
              item.item.newDisplayAsset.materialInstances[0].images.Background
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
        .filter((item) => item.bundle && item.items.length > 1)
        .map((item, index) => (
          <FortniteBundle
            key={index}
            image={item.newDisplayAsset.materialInstances[0].images.Background}
            items={item.items}
            //@ts-ignore
            name={item.bundle.name.wordCap()}
            cost={item.finalPrice}
          />
        ))}
      <FlatList
        data={specialFeatured.entries.filter((item) => !item.bundle)}
        renderItem={(item) => (
          <FortniteSkin
            image={
              item.item.newDisplayAsset.materialInstances[0].images.Background
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
