import {Router, Response, Request} from 'express';
import * as pg from 'pg';

const weddingRouter: Router = Router();
export {weddingRouter}
var config = {
  user: 'appuser', //env var: PGUSER
  database: 'nhb', //env var: PGDATABASE
  password: 'appuser', //env var: PGPASSWORD
  port: 5433, //env var: PGPORT
  max: 50, // max number of clients in the pool
  idleTimeoutMillis: 10000, // how long a client is allowed to remain idle before being closed
  Promise,
};
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



export class Food {
  name: string;
  type: string;
}

var menu: Food[];

let mapRowToFood = function (row) : Food {
  let foodItem = new Food();
  foodItem.name = row["name"];
  foodItem.type = row["type"];
  return foodItem;
};

let initializeFood = function () {
  menu = new Array();
    pool.query("SELECT * FROM wedding_food", (err, result) => {
      if (err) {
        return console.error('error running query', err);
      }
      result.rows.forEach(row => {
        let foodItem = mapRowToFood(row);
        menu.push(foodItem);
      });
    });
};

initializeFood();

let insertFoodDb = function (foodItem: Food) {

    pool.query("INSERT INTO wedding_food (name, type) values ($1, $2)",
               [foodItem.name, foodItem.type,],
               (err, result) => {
                 if (err) {
                   return console.error('error running query', err);
                 }
                 initializeFood();
               });
};

let resetMenu = function (requestedMenu: Food[]) {
    pool.query("DELETE FROM wedding_food ",
               (err, result) => {
                 if (err) {
                   return console.error('error running query', err);
                 }
                 requestedMenu.forEach(foodItem => insertFoodDb(foodItem));
               });
};

weddingRouter.get('/', (request: Request, response: Response) => {
  response.json(menu);
});

weddingRouter.post('/', (request: Request, response: Response) => {
  var requestedMenu: Food[] = request.body;
  resetMenu(requestedMenu);
  response.json(menu)
});

