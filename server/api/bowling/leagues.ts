import { Router, Response, Request } from 'express';
import * as pg from 'pg';
import * as path from 'path';
var multer =  require('multer');
import * as fs from 'fs';
let upload = multer();

const bowlingLeagueRouter: Router = Router();
const BOWLING_LEAGUE_UPLOADS = path.join(path.resolve(__dirname, '../../uploads'));


export { bowlingLeagueRouter }

export interface MulterFile {
  key: string // Available using `S3`.
  encoding: string // Available using `S3`.
  buffer: Buffer // Available using `DiskStorage`.
  mimetype: string
  originalname: string
  size: number
}

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


export class BowlingLeague {
  name : string;
  day : string;
  time : string;
  url : string;
  email : string


}

let leagues: BowlingLeague[];

let mapRowToBowlingLeague = function (row) : BowlingLeague {
  let league = new BowlingLeague();
  league.name = row["name"];
  league.day = row["day"];
  league.time = row["time"];
  league.url = row["url"];
  league.email = row["email"];
  return league;
};

let initializeBowlingLeagues = function () {
  leagues = new Array();
  pool.query("SELECT * FROM bowling_leagues", (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    result.rows.forEach(row => {
      let league = mapRowToBowlingLeague(row);
      leagues.push(league);
    });
  });
};

initializeBowlingLeagues();

let insertLeagueDb = function (league : BowlingLeague) {

  pool.query("INSERT INTO bowling_leagues (name, day, time, url, email) values ($1, $2, $3, $4, $5)",
             [league.name, league.day, league.time, league.url, league.email],
             (err, result) => {
               if (err) {
                 return console.error('error running query', err);
               }
             });
};

let resetLeagues = function (requestedLeagues: BowlingLeague[]) {
  pool.query("DELETE FROM bowling_leagues",
             (err, result) => {
               if (err) {
                 return console.error('error running query', err);
               }
               requestedLeagues.forEach(league => insertLeagueDb(league));
             });
};

bowlingLeagueRouter.get('/', (request, response: Response) => {
  response.json(leagues);
});

bowlingLeagueRouter.post('/', (request, response: Response) => {
  var requestedLeagues : BowlingLeague[] = request.body;
  resetLeagues(requestedLeagues);
  initializeBowlingLeagues();
});

bowlingLeagueRouter.post('/upload', upload.any(), function(request: Request  & { files: MulterFile[] }, response: Response) {
  let file = request.files[0];
  console.log('file: ' + JSON.stringify(file));
  console.log('file: ' + JSON.stringify(file.originalname));
  console.log('size: ' + JSON.stringify(file.size));
  var path = BOWLING_LEAGUE_UPLOADS + '/' + file.originalname;
  console.log(file.encoding);
  console.log(file.buffer);

  fs.writeFile(path, file.buffer, 'utf8', (err) => {
    console.log('here');
    if(err) {
      console.log(err);
      response.send(500);
    } else {
      console.log("The file was saved!");
      response.json(path);
    }
  });
});

