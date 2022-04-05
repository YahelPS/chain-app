import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import {
  DataTable,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Round, Team } from "../@types/valorant";
import Background from "../components/App/Background";
import CachedImage from "../components/App/CachedImage";
import HView from "../components/App/HView";
import Separator from "../components/App/Separator";
import PlayerCard from "../components/Valorant/PlayerCard";
import { colors, Text } from "../themes/Theme";

interface MatchDetailsProps {
  rounds: Round[];
  selfTeam: Team;
  otherTeam: Team;
  route: any;
}
import { LinearGradient } from "expo-linear-gradient";
import { hexToRgbA } from "../components/App/Badge";

export default function ValorantMatchDetails({ route }: MatchDetailsProps) {
  const { rounds, selfTeam, gameMode, players, otherTeam, self } = route.params;

  const firstHalf = rounds.slice(0, 12);
  const secondHalf = rounds.slice(12);
  const sortedPlayers = players
    .sort((a: any, b: any) => b.stats.score - a.stats.score)
    .map((player: any) =>
      Object({
        teamId: player.teamId,
        playerName: `${player.gameName}#${player.tagLine}`,
        kda: `${player.stats.kills} / ${player.stats.deaths} / ${player.stats.assists}`,
        score: player.stats.score,
        characterId: player.characterId,
      })
    );
  const matchMVP = players.sort(
    (a: any, b: any) => b.stats.score - a.stats.score
  )[0];
  const teamMVP = players
    .filter((player: any) => player.teamId === selfTeam.teamId)
    .sort((a: any, b: any) => b.stats.score - a.stats.score)[0];

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <View style={{ alignItems: "center" }}>
        <View style={{ position: "absolute", left: 0 }}>
          <CachedImage
            uri={`https://media.valorant-api.com/agents/${self.characterId}/bustportrait.png`}
            style={{ height: 150, width: 150 }}
          />
        </View>
        <Text variant="heading1">{gameMode}</Text>
        {gameMode !== "Deathmatch" && (
          <HView>
            <Text
              variant="heading2"
              style={{
                color: colors["valorant.positive"],
              }}
            >
              {selfTeam.roundsWon}
            </Text>
            <Text variant="heading2"> – </Text>
            <Text
              variant="heading2"
              style={{
                color: colors["valorant.negative"],
              }}
            >
              {otherTeam.roundsWon}
            </Text>
          </HView>
        )}
        <Text
          variant="heading2"
          style={{
            color: selfTeam.won
              ? colors["valorant.positive"]
              : colors["valorant.negative"],
            paddingBottom: 10,
          }}
        >
          {selfTeam.won ? "Victory" : "Defeat"}
        </Text>
      </View>

      {gameMode !== "Deathmatch" && (
        <View>
          <FlatList
            data={firstHalf}
            horizontal={true}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View key={index.toString()} style={{ alignItems: "center" }}>
                <LinearGradient
                  colors={[
                    "transparent",
                    hexToRgbA(
                      selfTeam.teamId === item.winningTeam
                        ? colors["valorant.positive"]
                        : colors["valorant.negative"],
                      0.25
                    ),
                  ]}
                  style={
                    selfTeam.teamId === item.winningTeam
                      ? styles.rowWin
                      : styles.rowLost
                  }
                />
                <Text variant="heading4">{index + 1}</Text>
              </View>
            )}
          />

          {secondHalf.length > 0 && <Separator text="Team Swap" />}

          <FlatList
            data={secondHalf}
            horizontal={true}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View key={index.toString()} style={{ alignItems: "center" }}>
                <LinearGradient
                  colors={[
                    "transparent",
                    hexToRgbA(
                      selfTeam.teamId === item.winningTeam
                        ? colors["valorant.positive"]
                        : colors["valorant.negative"],
                      0.25
                    ),
                  ]}
                  style={
                    selfTeam.teamId === item.winningTeam
                      ? styles.rowWin
                      : styles.rowLost
                  }
                />
                <Text variant="heading4">{index + 13}</Text>
              </View>
            )}
          />
        </View>
      )}

      <View style={{ paddingVertical: 20 }}>
        <PaperProvider
          theme={{
            ...DefaultTheme,
            //@ts-ignore
            fonts: {
              regular: {
                fontFamily: "Poppins-SemiBold",
              },
              medium: {
                fontFamily: "Poppins-Bold",
              },
            },
            colors: {
              ...DefaultTheme.colors,
              text: "white",
            },
          }}
        >
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ flex: 2.5 }}>Player</DataTable.Title>
              <DataTable.Title>KDA</DataTable.Title>
              <DataTable.Title numeric>Score</DataTable.Title>
            </DataTable.Header>
            {sortedPlayers.map((player: any, index: number, arr: []) => (
              <DataTable.Row
                key={index.toString()}
                style={
                  {
                    // backgroundColor:
                    //   player.teamId === selfTeam.teamId
                    //     ? colors["valorant.positive"]
                    //     : colors["valorant.negative"],
                    // borderTopEndRadius: index == 0 ? 10 : 0,
                    // borderTopStartRadius: index == 0 ? 10 : 0,
                    // borderBottomEndRadius: index == arr.length - 1 ? 10 : 0,
                    // borderBottomStartRadius: index == arr.length - 1 ? 10 : 0,
                  }
                }
              >
                <LinearGradient
                  start={[1, 0]}
                  end={[0, 0]}
                  colors={[
                    "transparent",
                    hexToRgbA(
                      player.teamId === selfTeam.teamId
                        ? colors["valorant.positive"]
                        : colors["valorant.negative"],
                      0.5
                    ),
                  ]}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                  }}
                >
                  <DataTable.Cell
                    style={{
                      flex: 3,
                      borderColor:
                        player.teamId === selfTeam.teamId
                          ? colors["valorant.positive"]
                          : colors["valorant.negative"],
                      borderLeftWidth: 2,
                      paddingLeft: 5,
                    }}
                  >
                    <CachedImage
                      uri={`https://media.valorant-api.com/agents/${player.characterId}/displayiconsmall.png`}
                      style={{ height: 30, width: 30 }}
                    />
                    {player.playerName}
                  </DataTable.Cell>
                  <DataTable.Cell>{player.kda}</DataTable.Cell>
                  <DataTable.Cell numeric>{player.score}</DataTable.Cell>
                </LinearGradient>
              </DataTable.Row>
            ))}
          </DataTable>
        </PaperProvider>
      </View>

      {gameMode !== "Deathmatch" && (
        <HView style={{ justifyContent: "space-between" }}>
          <View>
            <Text variant="heading3" style={{ alignSelf: "center" }}>
              Match MVP
            </Text>
            <PlayerCard player={matchMVP} />
          </View>
          <View>
            <Text variant="heading3" style={{ alignSelf: "center" }}>
              Team MVP
            </Text>
            <PlayerCard player={teamMVP} />
          </View>
        </HView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rowWin: {
    height: 80,
    width: 40,
    borderColor: colors["valorant.positive"],
    borderWidth: 1,
    // backgroundColor: colors["valorant.positive"],
    margin: 5,
    borderRadius: 10,
  },
  rowLost: {
    height: 80,
    width: 40,
    borderColor: colors["valorant.negative"],
    borderWidth: 1,
    // backgroundColor: colors["valorant.negative"],
    margin: 5,
    borderRadius: 10,
  },
  container: { borderRadius: 10 },
  head: {
    height: 40,
  },
  text: { margin: 6, fontFamily: "Poppins-SemiBold", color: colors["grey"] },
});
