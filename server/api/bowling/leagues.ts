import { Router, Response, Request } from 'express';

const bowlingLeagueRouter: Router = Router();

export { bowlingLeagueRouter }

export class BowlingLeague {
  name : string;
  day : string;
  time : string;
  url : string;
}

const LEAGUES : BowlingLeague[] = [
  {name : "Swinging Seniors", day : "Monday", time : "4pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/swinging_seniors/swinging_seniors_1601.png'},
  {name : "Timber", day : "Monday", time : "6:30pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/timber/timber_1601.png'},
  {name : "League3", day : "Tuesday", time : "7pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/swinging_seniors/swinging_seniors_1601.png'},
  {name : "League4", day : "Wednesday", time : "4pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/timber/timber_1601.png'},
  {name : "League5", day : "Wednesday", time : "6:30pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/swinging_seniors/swinging_seniors_1601.png'},
  {name : "League6", day : "Thursday", time : "6:30pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/timber/timber_1601.png'},
  {name : "League7", day : "Thursday", time : "7pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/swinging_seniors/swinging_seniors_1601.png'},
  {name : "League8", day : "Friday", time : "7pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/timber/timber_1601.png'},
  {name : "League9", day : "Saturday", time : "12pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/swinging_seniors/swinging_seniors_1601.png'},
  {name : "League10", day : "Saturday", time : "6pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/timber/timber_1601.png'},
  {name : "League11", day : "Sunday", time : "2pm", url: 'http://www.newhopebowl.net/league_bowling/monday_pages/swinging_seniors/swinging_seniors_1601.png'},
]

var leagues = LEAGUES;

bowlingLeagueRouter.get('/', (request: Request, response: Response) => {
  response.json(leagues);
});

bowlingLeagueRouter.post('/', (request: Request, response: Response) => {
  var requestedLeagues : BowlingLeague[] = request.body;
  leagues = requestedLeagues;
});
