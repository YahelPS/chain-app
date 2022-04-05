import { Animated, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Text } from "../../themes/Theme";
import HView from "./HView";
import Tab from "./Tab";
import ButtonComponent from "./ButtonComponent";

export default function TopTabs({ navigation, onNav }: { navigation: any }) {
  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;
  const width = useRef(new Animated.Value(0)).current;

  const [active, setActive] = useState(0);
  const tabs = ["User Info", "Store", "Match History"];
  const [sizes, setSizes] = useState<any>({});
  function update(obj: any) {
    Animated.timing(x, {
      toValue: obj.x,
      duration: 250,
      useNativeDriver: false,
    }).start();

    Animated.timing(y, {
      toValue: obj.y,
      duration: 250,
      useNativeDriver: false,
    }).start();

    Animated.timing(width, {
      toValue: obj.width,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }
  return (
    <View>
      <HView
        style={{
          paddingBottom: 10,
          borderBottomWidth: 2,
          borderBottomColor: "white",
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            text={tab}
            active={active === index}
            onPress={() => {
              setActive(index);
              onNav(index);
              update(sizes[index]);
            }}
            onLayout={(event: any) => {
              const { x, y, width } = event.nativeEvent.layout;
              sizes[index] = { x, y, width };
              setSizes(sizes);
              if (index === 0) {
                update(sizes[0]);
              }
            }}
          />
        ))}
      </HView>

      <Animated.View
        style={{
          width,
          position: "absolute",
          left: x,
          bottom: y,
          height: 5,
          backgroundColor: "white",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomColor: "white",
    borderBottomWidth: 5,
  },
  tab2: {
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderBottomColor: "white",
    borderBottomWidth: 2,
  },
});
