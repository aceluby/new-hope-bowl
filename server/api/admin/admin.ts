import {Router, Response, Request} from 'express';
import * as pg from 'pg';
pg.defaults.ssl = true;

const adminRouter: Router = Router();
export {adminRouter}
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

export class User {
  id : number;
  name: string;
  email: string;
  roles: string;
}

let allUsers : User[];

let mapRowToUser = function(row) {
  let user = new User();
  user.id = row["id"];
  user.name = row["name"];
  user.email = row["email"];
  user.roles = row["roles"];
  return user;
};

let initializeUsers = function () {
  allUsers = new Array();
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    result.rows.forEach(row => {
      let user = mapRowToUser(row);
      allUsers.push(user);
    });
  });
};

initializeUsers();

let insertUser = function (user: User) {

  pool.query("INSERT INTO users (name, email, roles) values ($1, $2, $3)",
             [user.name, user.email, user.roles],
             (err, result) => {
               if (err) {
                 return console.error('error running query', err);
               }
               initializeUsers();
             });
};

let resetUsers = function (requestedUsers: User[]) {
  pool.query("DELETE FROM users ",
             (err, result) => {
               if (err) {
                 return console.error('error running query', err);
               }
               requestedUsers.forEach(user => insertUser(user));
             });
};

let getUser = function(name) : User {
  let users = allUsers.filter(user => user.name == name);
  if (users == null) {
    return null;
  } else {
    return users[0];
  }
};

adminRouter.get('/', (request: Request, response: Response) => {
    response.json(allUsers);
});



adminRouter.post('/', (request: Request, response: Response) => {
  var requestedUsers: User[] = request.body;
  resetUsers(requestedUsers);
  response.json(allUsers)
});

