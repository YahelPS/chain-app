import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import HView from "./HView";
import { Text } from "..";

export default function Stars({ starCount }: { starCount: number }) {
  const fullStars = Math.floor(starCount);
  const halfStars = starCount % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  return (
    <HView style={{ paddingTop: 10, alignItems: "center" }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <FontAwesome5
          name="star"
          solid
          color="#ffed05"
          size={12}
          style={{ paddingRight: 3 }}
          key={i.toString()}
        />
      ))}
      {Array.from({ length: halfStars }).map((_, i) => (
        <FontAwesome5
          name="star-half-alt"
          color="#ffed05"
          size={12}
          style={{ paddingRight: 3 }}
          key={i.toString()}
        />
      ))}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <FontAwesome5
          name="star"
          outline
          color="#ffed05"
          size={12}
          style={{ paddingRight: 3 }}
          key={i.toString()}
        />
      ))}
      <Text variant="caption" style={{ paddingLeft: 10 }}>
        {starCount}
      </Text>
    </HView>
  );
}
