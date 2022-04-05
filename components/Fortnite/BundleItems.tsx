import React from "react";
import { FlatList, View } from "react-native";
import { Text } from "../../themes/Theme";
import FortniteSkin from "./FortniteSkin";

interface BundleItemsProps {
  name: string;
  items: object[];
}

export default function BundleItems({ name, items }: BundleItemsProps) {
  return (
    <View>
      <Text variant="valorantTitle">{name}</Text>
      <FlatList
        data={items}
        renderItem={(item) => (
          //@ts-ignore
          <FortniteSkin image={item.item.images.icon} name={item.item.name} />
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
}
