import { Router, Response, Request } from 'express';
import * as pg from 'pg';
const openBowlingRouter: Router = Router();

export { openBowlingRouter }

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

export class OpenBowling {
  day: string;
  startTime: string;
  endTime: string;
  price: string;
}

const OPEN_BOWLING : OpenBowling[] = [
  {day: 'Monday', startTime: '4:00 PM', endTime: '10:00 PM', price:'$3.50'},
  {day: 'Tuesday', startTime: '4:00 PM', endTime: '10:00 PM', price:'$3.50'},
  {day: 'Wednesday', startTime: '4:00 PM', endTime: '10:00 PM', price:'$3.50'},
  {day: 'Thursday', startTime: '4:00 PM', endTime: '10:00 PM', price:'$3.50'},
  {day: 'Thursday', startTime: '10:00 PM', endTime: 'Midnight', price:'$2.00'},
  {day: 'Friday', startTime: '4:00 PM', endTime: '9:30 PM', price:'$4.25'},
  {day: 'Friday', startTime: '9:30 PM', endTime: 'Midnight', price:'$2.50'},
  {day: 'Saturday', startTime: 'Noon', endTime: '4:00 PM', price:'$4.00'},
  {day: 'Saturday', startTime: '4:00 PM', endTime: 'Midnight', price:'$4.75'},
  {day: 'Sunday', startTime: 'Noon', endTime: '4:00', price:'$2.50'},
  {day: 'Sunday', startTime: '4:00 PM', endTime: '10:00 PM', price:'$3.50'}
];

let openBowling : OpenBowling[];

let mapRowToOpenBowling = function (row) : OpenBowling {
  let openBowl = new OpenBowling();
  openBowl.day = row["day"];
  openBowl.startTime = row["start_time"];
  openBowl.endTime = row["end_time"];
  openBowl.price = row["price"];
  return openBowl;
};

let initializeOpenBowling = function () {
  openBowling = new Array();
  pool.query("SELECT * FROM bowling_leagues", (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    result.rows.forEach(row => {
      let openBowl = mapRowToOpenBowling(row);
      openBowling.push(openBowl);
    });
  });
};

initializeOpenBowling();

let insertOpenBowlDb = function (openBowl : OpenBowling) {

  pool.query("INSERT INTO open_bowl (day, start_time, end_time, price) values ($1, $2, $3, $4)",
             [openBowl.day, openBowl.startTime, openBowl.endTime, openBowl.price],
             (err, result) => {
               if (err) {
                 return console.error('error running query', err);
               }
               initializeOpenBowling();
             });
};

let resetOpenBowling = function (requestedOpenBowling: OpenBowling[]) {
  pool.query("DELETE FROM open_bowl ",
             (err, result) => {
               if (err) {
                 return console.error('error running query', err);
               }
               requestedOpenBowling.forEach(openBowl => insertOpenBowlDb(openBowl));
             });
};

openBowlingRouter.get('/', (request: Request, response: Response) => {
  response.json(openBowling);
});

openBowlingRouter.post('/', (request: Request, response: Response) => {
  var requestedOpenBowling : OpenBowling[] = request.body;
  resetOpenBowling(requestedOpenBowling);
});
