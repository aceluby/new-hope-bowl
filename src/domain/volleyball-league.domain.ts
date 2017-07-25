export class VolleyballLeague {
  id : number;
  name : string;
  day : string;
  year : string;
  isPlayoffs : boolean;
}

export class VolleyballTeam {
  name : string;
  league : VolleyballLeague;
  division : string;
  wins: number;
  losses: number;
  divisionWins: number;
  pointsFor : number;
  pointsAgainst : number;
  diff : number;
}

export class VolleyballGame {
  id : number;
  teamOne : VolleyballTeam;
  teamOneHome : boolean;
  teamOneScoreGameOne : number;
  teamOneWinGameOne : boolean;
  teamOneScoreGameTwo : number;
  teamOneWinGameTwo : boolean;
  teamOneScoreGameThree : number;
  teamOneWinGameThree : boolean;
  teamTwo : VolleyballTeam;
  teamTwoScoreGameOne : number;
  teamTwoWinGameOne : boolean;
  teamTwoScoreGameTwo : number;
  teamTwoWinGameTwo : boolean;
  teamTwoScoreGameThree : number;
  teamTwoWinGameThree : boolean;
  divisionalGame : boolean;
  date: string;
  time: string;
  court: number;
}

export class Playoff {
  id : number;
  game1 : VolleyballGame;
  game2 : VolleyballGame;
  game3 : VolleyballGame;
  game4 : VolleyballGame;
  game5 : VolleyballGame;
  game6 : VolleyballGame;
  game7 : VolleyballGame;
  game8 : VolleyballGame;
  game9 : VolleyballGame;
  game10 : VolleyballGame;
  game11 : VolleyballGame;
  game12 : VolleyballGame;
}




