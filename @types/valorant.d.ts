export interface MatchDetails {
  matchInfo: {
    matchId: string;
    mapId: string;
    isRanked: boolean;
    isMatchSampled: boolean;
    gameLengthMillis: number;
    gameStartMillis: number;
    queueID: "unrated" | "deathmatch" | "spikerush" | "";
  };
  roundResults: Round[];
  players: {
    subject: string;
    teamId: string;
    stats: { kills: number; deaths: number; assists: number };
  }[];
  teams: Team[];
}

export interface Team {
  teamId: string;
  won: boolean;
  roundsWon: number;
}

export interface Round {
  roundNum: number;
  winningTeam: string;
}
