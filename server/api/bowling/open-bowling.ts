import { Router, Response, Request } from 'express';

const openBowlingRouter: Router = Router();

export { openBowlingRouter }

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
]

var openBowling = OPEN_BOWLING;

openBowlingRouter.get('/', (request: Request, response: Response) => {
  response.json(openBowling);
});

openBowlingRouter.post('/', (request: Request, response: Response) => {
  var requestedOpenBowling : OpenBowling[] = request.body;
  openBowling = requestedOpenBowling;
});
