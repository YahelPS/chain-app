import { View, ActivityIndicator, PlatformColor } from "react-native";
import React, { useEffect, useState } from "react";
import ValorantMatch from "../components/Valorant/ValorantMatch";
import { GetMatchHistory, Headers } from "../apis/Valorant";
import { ScrollView } from "react-native-gesture-handler";
import ButtonComponent from "../components/App/ButtonComponent";
import { Feather } from "@expo/vector-icons";
import Nav from "../components/App/Nav";
import Toast from "react-native-toast-message";
import { NavigationAction, NavigationProp } from "@react-navigation/native";
import { Text } from "../components";
import AppHeader from "../components/App/AppHeader";
import Background from "../components/App/Background";

export default function ValorantMatches({
  navigation,
  route,
}: {
  route: any;
  navigation: any;
}) {
  const [headers, setHeaders] = useState<any>();
  const [matches, setMatches] = useState<any>();
  const [hasError, setHasError] = useState<boolean>(false);

  //@ts-ignore
  useEffect(async () => {
    // console.log(route.params.accessToken);

    try {
      const fetchedHeaders = await Headers({
        accessToken: route.params.accessToken,
      });
      // console.log("headers fetched");

      const matchData = await GetMatchHistory(fetchedHeaders);
      // console.log("match data fetched");
      // console.log({ fetchedHeaders, matchData });

      setHeaders(fetchedHeaders);
      setMatches(matchData);
    } catch {
      setHasError(true);
      Toast.show({
        type: "error",
        text1: "An error occurred while fetching match history",
        text2: "Please try again",
      });
      // navigation.goBack();
    }
  }, []);

  if (hasError)
    return (
      <Text
        variant="heading4"
        style={{ alignSelf: "center", textAlign: "center", paddingTop: 10 }}
      >
        An error occurred while fetching match history.
        <Text variant="body">{`\nPlease try again later.`}</Text>
      </Text>
    );
  if (!headers || !matches) return <ActivityIndicator color="white" />;

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      {matches.History.map((match: any, index: number) => (
        <ValorantMatch
          match={match}
          headers={headers}
          key={index.toString()}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
}
