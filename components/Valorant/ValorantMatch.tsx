import { View, ImageBackground, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { GetMaps, GetMatch } from "../../apis/Valorant";
import { colors, Text } from "../../themes/Theme";
import HView from "../App/HView";
import { MatchDetails, Team } from "../../@types/valorant";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

export default function ValorantMatch({
  match,
  headers,
  navigation,
}: {
  match: any;
  headers: { puuid: string };
  navigation: any;
}) {
  const gameModes = {
    unrated: "Unrated",
    deathmatch: "Deathmatch",
    spikerush: "Spike Rush",
    competitive: "Competitive",
    onefa: "Replication",
    "": "Custom Game",
  };
  const [matchData, setMatchData] = useState<MatchDetails>();
  const [maps, setMaps] = useState<any>();
  //@ts-ignores
  useEffect(async () => {
    const data = await GetMatch(match.MatchID, headers);
    setMatchData(data);
    const mapsData = await GetMaps();
    setMaps(mapsData);
  }, []);
  if (!matchData || !maps) return null;

  const map = maps.data.find(
    (map: any) => map.mapUrl === matchData.matchInfo.mapId
  );

  const player = matchData.players.find(
    (player) => player.subject === headers?.puuid
  );

  const selfTeam: Team | undefined = matchData.teams.find(
    (team: Team) => team.teamId === player?.teamId
  );
  const otherTeam: Team | undefined = matchData.teams.find(
    (team: Team) => team.teamId !== selfTeam?.teamId
  );

  const victory = selfTeam?.won;

  return (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() =>
        navigation.navigate("ValorantMatchDetails", {
          selfTeam,
          otherTeam,
          rounds: matchData.roundResults,
          gameMode: gameModes[matchData.matchInfo.queueID],
          players: matchData.players,
          self: player,
          headers,
        })
      }
    >
      <ImageBackground
        style={styles.container}
        imageStyle={{ borderRadius: 10, opacity: 0.7 }}
        source={{
          uri: map.listViewIcon,
        }}
      >
        <HView style={{ justifyContent: "space-between" }}>
          <View>
            <Text variant="heading2">
              {gameModes[matchData.matchInfo.queueID]}
            </Text>
            <Text variant="heading3">{map.displayName}</Text>
          </View>
          <View style={{ alignItems: "center" }}></View>
          <Text
            variant="heading2"
            style={{
              color: victory
                ? colors["valorant.positive"]
                : colors["valorant.negative"],
            }}
          >
            {victory ? "Victory" : "Defeat"}
          </Text>
        </HView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            top: "-50%",
          }}
        >
          <HView style={styles.shadow}>
            <Text
              variant="heading2"
              style={{ color: colors["valorant.positive"] }}
            >
              {selfTeam?.roundsWon}
            </Text>
            <Text variant="heading2"> – </Text>
            <Text
              variant="heading2"
              style={{ color: colors["valorant.negative"] }}
            >
              {otherTeam?.roundsWon}
            </Text>
          </HView>
          <Text variant="heading4">
            {player?.stats.kills} / {player?.stats.deaths} /{" "}
            {player?.stats.assists}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 350,
    height: 100,
    padding: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});
