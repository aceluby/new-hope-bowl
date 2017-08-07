import {Router, Response, Request} from 'express';
import * as pg from 'pg';

const volleyballLeagueRouter: Router = Router();
const url = require('url');
let config;

if (process.env.NODE_ENV == 'production') {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');
  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
} else {
  config = {
    user: ('appuser'), //env var: PGUSER
    database: 'nhb', //env var: PGDATABASE
    password: 'appuser', //env var: PGPASSWORD
    port: 5433, //env var: PGPORT
    max: 50, // max number of clients in the pool
    idleTimeoutMillis: 10000, // how long a client is allowed to remain idle before being closed
    Promise,
    ssl: false
  };
}

let pool = new pg.Pool(config);

pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack)
  connectPool();
});

let connectPool = function () {
  pool.connect((err, client) => {
    if (err) {
      return console.error("Error fetching client from pool", err);
    }
  });
};

connectPool();

export {volleyballLeagueRouter}

export class VolleyballLeague {
  id: number;
  year: number;
  name: string;
  day: string;
  isPlayoffs: boolean;
}

export class VolleyballTeam {
  id: number;
  name: string;
  league: VolleyballLeague;
  division: string;
  wins: number;
  losses: number;
  divisionWins: number;
  pointsFor: number;
  pointsAgainst: number;
  diff: number;
}

export class VolleyballGame {
  id: number;
  teamOne: VolleyballTeam;
  teamOneHome: boolean;
  teamOneScoreGameOne: number;
  teamOneWinGameOne: boolean;
  teamOneScoreGameTwo: number;
  teamOneWinGameTwo: boolean;
  teamOneScoreGameThree: number;
  teamOneWinGameThree: boolean;
  teamTwo: VolleyballTeam;
  teamTwoScoreGameOne: number;
  teamTwoWinGameOne: boolean;
  teamTwoScoreGameTwo: number;
  teamTwoWinGameTwo: boolean;
  teamTwoScoreGameThree: number;
  teamTwoWinGameThree: boolean;
  divisionalGame: boolean;
  date: string;
  time: string;
  court: number;
}

export class Playoff {
  id: number;
  league: VolleyballLeague;
  game1: VolleyballGame;
  game2: VolleyballGame;
  game3: VolleyballGame;
  game4: VolleyballGame;
  game5: VolleyballGame;
  game6: VolleyballGame;
  game7: VolleyballGame;
  game8: VolleyballGame;
  game9: VolleyballGame;
  game10: VolleyballGame;
  game11: VolleyballGame;
  game12: VolleyballGame;
}

let leagues: VolleyballLeague[] = new Array();
let teams: VolleyballTeam[] = new Array();
let schedule: VolleyballGame[] = new Array();
let playoffs: Playoff[] = new Array();

let mapRowToLeague = function (row): VolleyballLeague {
  let league = new VolleyballLeague();
  league.id = row["id"];
  league.name = row["name"];
  league.day = row["day"];
  league.year = row["year"];
  return league;
};

let initializeLeague = function () {
  leagues = new Array();
    pool.query("SELECT * FROM volleyball_league", (err, result) => {
      if (err) {
        return console.error('error running query', err);
      }
      result.rows.forEach(row => {
        let league = mapRowToLeague(row);
        leagues.push(league);
      });
      initializeTeams();
    });
};

let getLeague = function (id): VolleyballLeague {
  return leagues.filter(league => league.id == id)[0];
};

let mapRowToTeam = function (row): VolleyballTeam {
  let team = new VolleyballTeam();
  team.id = row["id"];
  team.name = row["name"];
  team.league = getLeague(row["league_id"]);
  team.division = row["division"];
  team.wins = row["wins"];
  team.losses = row["losses"];
  team.divisionWins = row["division_wins"];
  team.pointsFor = row["points_for"];
  team.pointsAgainst = row["points_against"];
  team.diff = row["diff"];
  return team;
}

let initializeTeams = function () {
  teams = new Array();

  pool.query("SELECT * FROM volleyball_team", (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    result.rows.forEach(row => {
      let team = mapRowToTeam(row);
      teams.push(team);
    });
    initializeSchedule();
  });
};

let getTeam = function (id) {
  return teams.filter(team => team.id == id)[0];
};

let mapRowToGame = function (row) {
  let game = new VolleyballGame();
  game.id = row["id"];
  game.teamOne = getTeam(row["team_one_id"]);
  game.teamOneHome = row["team_one_home"];
  game.teamOneScoreGameOne = row["team_one_score_g1"];
  game.teamOneWinGameOne = row["team_one_win_g1"];
  game.teamOneScoreGameTwo = row["team_one_score_g2"];
  game.teamOneWinGameTwo = row["team_one_win_g2"];
  game.teamOneScoreGameThree = row["team_one_score_g3"];
  game.teamOneWinGameThree = row["team_one_win_g3"];
  game.teamTwo = getTeam(row["team_two_id"]);
  game.teamTwoScoreGameOne = row["team_two_score_g1"];
  game.teamTwoWinGameOne = row["team_two_win_g1"];
  game.teamTwoScoreGameTwo = row["team_two_score_g2"];
  game.teamTwoWinGameTwo = row["team_two_win_g2"];
  game.teamTwoScoreGameThree = row["team_two_score_g3"];
  game.teamTwoWinGameThree = row["team_two_win_g3"];
  game.divisionalGame = row["divisional_game"];
  game.date = row["date"];
  game.time = row["time"];
  game.court = row["court"];
  return game;
};

let initializeSchedule = function () {
  schedule = new Array();
    pool.query("SELECT * FROM volleyball_game", (err, result) => {
      if (err) {
        return console.error('error running query', err);
      }
      result.rows.forEach(row => {
        let game = mapRowToGame(row);
        schedule.push(game);
      });
      initializePlayoffs();
    });
};

let getGame = function (id) {
  return schedule.filter(game => game.id == id)[0];
};

let mapRowToPlayoff = function (row) {
  let playoff = new Playoff();
  playoff.id = row["id"];
  playoff.league = getLeague(row["league_id"]);
  playoff.game1 = getGame["game1_id"];
  playoff.game2 = getGame["game2_id"];
  playoff.game3 = getGame["game3_id"];
  playoff.game4 = getGame["game4_id"];
  playoff.game5 = getGame["game5_id"];
  playoff.game6 = getGame["game6_id"];
  playoff.game7 = getGame["game7_id"];
  playoff.game8 = getGame["game8_id"];
  playoff.game9 = getGame["game9_id"];
  playoff.game10 = getGame["game10_id"];
  playoff.game11 = getGame["game11_id"];
  playoff.game12 = getGame["game12_id"];
  return playoff;
};

let initializePlayoffs = function () {
    pool.query("SELECT * FROM playoff", (err, result) => {
      if (err) {
        return console.error('error running query', err);
      }
      result.rows.forEach(row => {
        let playoff = mapRowToPlayoff(row);
        playoffs.push(playoff);
      });
    });
};

initializeLeague();

let insertLeagueDb = function (league: VolleyballLeague) {

    pool.query("INSERT INTO volleyball_league (year, name, day) values ($1, $2, $3)",
               [league.year, league.name, league.day],
               (err, result) => {
                 if (err) {
                   return console.error('error running query', err);
                 }
                 initializeLeague();
               });
};

let resetLeagues = function (requestedLeagues: VolleyballLeague[]) {
    pool.query("DELETE FROM volleyball_league WHERE year=$1 ",
               [requestedLeagues[0].year],
               (err, result) => {
                 if (err) {
                   return console.error('error running query', err);
                 }
                 requestedLeagues.forEach(league => insertLeagueDb(league));
               });
};

volleyballLeagueRouter.get('/', (request: Request, response: Response) => {
  response.json(leagues);
});

volleyballLeagueRouter.post('/', (request: Request, response: Response) => {
  var requestedLeagues: VolleyballLeague[] = request.body;
  resetLeagues(requestedLeagues);
  initializeLeague();
  response.json(leagues)
});

volleyballLeagueRouter.get('/teams', (request: Request, response: Response) => {
  response.json(teams);
});

let insertTeamDb = function (team: VolleyballTeam) {
  pool.connect((err, client) => {
    if (err) {
      return console.error("Error fetching client from pool", err);
    }
    pool.query("INSERT INTO volleyball_team (name, league_id, division) values ($1, $2, $3)",
               [team.name, team.league.id, team.division],
               (err, result) => {
                 if (err) {
                   return console.error('error running query insertTeamDb', err);
                 }
               });
  });
};

let resetTeamDb = function (requestedTeams: VolleyballTeam[]) {
  pool.connect((err, client) => {
    if (err) {
      return console.error("Error fetching client from pool", err);
    }
    pool.query("DELETE FROM volleyball_team WHERE id IN (" +
               "SELECT t.id FROM volleyball_team t JOIN volleyball_league l " +
               "ON t.league_id = l.id WHERE l.id = $1)",
               [requestedTeams[0].league.id],
               (err, result) => {
                 if (err) {
                   return console.error('error running query resetTeamDb', err);
                 }
                 requestedTeams.forEach(team => insertTeamDb(team));
               });
  });
};

volleyballLeagueRouter.post('/teams', (request: Request, response: Response) => {
  var requestedTeams: VolleyballTeam[] = request.body;
  resetTeamDb(requestedTeams);
  initializeTeams();
  response.json(teams);
});

volleyballLeagueRouter.get('/schedules', (request: Request, response: Response) => {
  response.json(schedule);
});

let insertGameDb = function (game: VolleyballGame) {

  let insertQuery = "INSERT INTO volleyball_game " +
                    "(team_one_id, team_one_home, team_one_score_g1, team_one_win_g1, team_one_score_g2," +
                    " team_one_win_g2, team_one_score_g3, team_one_win_g3, team_two_id," +
                    " team_two_score_g1, team_two_win_g1, team_two_score_g2, team_two_win_g2, team_two_score_g3," +
                    " team_two_win_g3, divisional_game, date, time, court) values " +
                    "($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);";
  pool.query(insertQuery,
             [game.teamOne.id, game.teamOneHome, game.teamOneScoreGameOne, game.teamOneWinGameOne,
              game.teamOneScoreGameTwo, game.teamOneWinGameTwo, game.teamOneScoreGameThree,
              game.teamOneWinGameThree, game.teamTwo.id, game.teamTwoScoreGameOne, game.teamTwoWinGameOne,
              game.teamTwoScoreGameTwo, game.teamTwoWinGameTwo, game.teamTwoScoreGameThree,
              game.teamTwoWinGameThree, game.divisionalGame, game.date, game.time, game.court],
             (err, result) => {
               if (err) {
                 return console.error('error running query insertGameDb', err);
               }
             });

};

let resetGameDb = function (requestedGames: VolleyballGame[]) {
  pool.query("DELETE FROM volleyball_game v WHERE v.id IN (" +
             "SELECT g.id FROM volleyball_game g JOIN volleyball_team t " +
             "ON g.team_one_id = t.id JOIN volleyball_league l " +
             "ON t.league_id = l.id WHERE l.id = $1)",
             [requestedGames[0].teamOne.league.id],
             (err, result) => {
               if (err) {
                 return console.error('error running query resetGameDb', err);
               }
               requestedGames.forEach(game => insertGameDb(game));
             });
};

volleyballLeagueRouter.post('/schedules', (request: Request, response: Response) => {
  var requestedSchedule: VolleyballGame[] = request.body;
  resetGameDb(requestedSchedule);
  initializeSchedule();
  response.json(schedule);
});

volleyballLeagueRouter.get('/playoffs', (request: Request, response: Response) => {
  response.json(playoffs);
});

let insertPlayoffDb = function (playoff: Playoff) {
  pool.connect((err, client) => {
    if (err) {
      return console.error("Error fetching client from pool", err);
    }
    pool.query("INSERT INTO playoff " +
               "(league_id, game1_id, game2_id, game3_id, game4_id, game5_id, game6_id," +
               " game7_id, game8_id, game9_id, game10_id, game11_id, game12_id,) values " +
               "($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
               [playoff.league.id, playoff.game1.id, playoff.game2.id,],
               (err, result) => {
                 if (err) {
                   return console.error('error running query', err);
                 }
               });
  });
};

let updatePlayoffDb = function (playoff: Playoff) {
  pool.connect((err, client) => {
    if (err) {
      return console.error("Error fetching client from pool", err);
    }
    // pool.query("UPDATE volleyball_game SET team_one_id=$1, team_one_home=$2, team_one_score_g1=$3, " +
    //            "team_one_win_g1=$4, team_one_score_g2=$5, team_one_win_g2=$6, team_one_score_g3=$7," +
    //            "team_one_win_g3=$8, team_two_id=$9, team_two_score_g1=$10, team_two_win_g1=$11, " +
    //            "team_two_score_g2=$12, team_two_win_g2=$13, team_two_score_g3=$14, team_two_win_g3=$15, " +
    //            "divisional_game=$16, date=$17, time=$18, court=$19" +
    //            " WHERE id=$20 ",
    //            [game.teamOne.id, game.teamOneHome, game.teamOneScoreGameOne, game.teamOneWinGameOne,
    //             game.teamOneScoreGameTwo, game.teamOneWinGameTwo, game.teamOneScoreGameThree,
    //             game.teamOneWinGameThree, game.teamTwo.id, game.teamTwoScoreGameOne, game.teamTwoWinGameOne,
    //             game.teamTwoScoreGameTwo, game.teamTwoWinGameTwo, game.teamTwoScoreGameThree,
    //             game.teamTwoWinGameThree, game.divisionalGame, game.date, game.time, game.court, game.id],
    //            (err, result) => {
    //              if(err) {
    //                return console.error('error running query', err);
    //              }
    //            });
  });
};

volleyballLeagueRouter.post('/playoffs', (request: Request, response: Response) => {
  var requestedPlayoffs: Playoff[] = request.body;
  requestedPlayoffs.forEach(playoff => {
    if (playoff.id == null) {
      insertPlayoffDb(playoff);
    } else {
      updatePlayoffDb(playoff);
    }
  });
  playoffs = requestedPlayoffs;
  response.json(playoffs);
});
