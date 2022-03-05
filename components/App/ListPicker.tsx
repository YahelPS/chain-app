import React, { useState, useEffect, useRef } from "react";
import { LayoutRectangle, LayoutChangeEvent, Dimensions } from "react-native";
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export type RouteProps = {
  id: string;
  name: string;
};

export type NavigationTabsProps = {
  id: string;
  name: string;
};

export type HorizontalScrollMenu = {
  items: Array<NavigationTabsProps>;
  onPress: (route: RouteProps) => void;
  upperCase?: boolean;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  activeTextColor?: string;
  activeBackgroundColor?: string;
  selected: string;
  scrollAreaStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: boolean | "always" | "never" | "handled";
  itemWidth?: number;
};

const ListPicker: React.FC<HorizontalScrollMenu> = ({
  items,
  onPress,
  upperCase = false,
  textStyle,
  buttonStyle,
  activeTextColor = "#ffffff",
  activeBackgroundColor = "#000000",
  selected = 0,
  scrollAreaStyle,
  keyboardShouldPersistTaps = "always",
  itemWidth = 100,
}) => {
  const [index, setIndex] = useState<any>(selected);

  useEffect(() => {
    if (selected != index) {
      setIndex(selected);
    }

    if (selected) {
      setIndex(selected);
    }
  }, [selected]);

  const centerPadding = screenWidth / 2 - itemWidth / 2;

  return (
    <View style={[scrollAreaStyle, styles.scrollAreaStyle]}>
      <View
        style={[
          styles.contentContainerStyle,
          { paddingHorizontal: centerPadding },
        ]}
      >
        {items.map((route, i) => (
          <Pressable
            style={[
              styles.tabItem,
              { width: itemWidth },
              index === route.id && styles.tabItemFocused,
              buttonStyle ? buttonStyle : styles.buttonStyles,
              index === route.id && activeBackgroundColor
                ? { backgroundColor: activeBackgroundColor }
                : false,
            ]}
            key={(route.id ? route.id : i).toString()}
            onPress={() => {
              //@ts-ignore
              return onPress(route);
            }}
          >
            <Text
              style={[
                textStyle ? textStyle : styles.tabItemText,
                index == route.id && styles.tabItemTextFocused,
                index == route.id && activeTextColor
                  ? { color: activeTextColor }
                  : false,
              ]}
            >
              {upperCase ? route.name.toUpperCase() : route.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    borderRadius: 10,
    borderColor: "#E4E4E4",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  tabItemText: {
    color: "#8C8C8C",
  },
  tabItemFocused: {
    borderWidth: 0,
  },
  tabItemTextFocused: {
    color: "#FFFFFF",
  },
  buttonStyles: {
    marginRight: 10,
  },
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  scrollAreaStyle: {
    height: 50,
  },
});

export default ListPicker;
