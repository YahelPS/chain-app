import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "../components";
import AppHeader from "../components/App/AppHeader";
import FormComponent from "../components/Forms/FormComponent";

const settings = [
  {
    title: "Notifications",
    key: "notifications",
    children: [
      {
        title: "Game Notifications",
        key: "gameNotifications",
        type: "switch",
        description:
          "Ex. receive notifications when your daily Valorant store changes. You can set game specific behavior in the Games screen.",
        action: async (value: boolean) => {},
      },
      {
        title: "News Notifications",
        description: "Recieve notifications when new news is available",
        key: "news",
        type: "switch",
      },
    ],
  },
];

export default function Settings() {
  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      {settings.map((setting) => (
        <View>
          <Text variant="heading2">{setting.title}</Text>
          {setting.children.map((child) => (
            <FormComponent
              title={child.title}
              key={child.key}
              //@ts-ignore
              type={child.type}
              description={child.description}
              //@ts-ignore
              options={child.options}
              action={child.action}
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

//#030937
//#12167d
//#510b6a
//#ffed05
