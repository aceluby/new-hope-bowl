import { Router, Response, Request } from 'express';

const newsRouter: Router = Router();

export { newsRouter }

export class News {
  headline : string;
  details : string;
  startDate : string;
  endDate : string;
}

const NEWSLIST : News[] = [
  {headline : "News!", details : "News Details", startDate: '01-01-2000', endDate: '12-31-2029'},
];

var newsList = NEWSLIST;

newsRouter.get('/', (request: Request, response: Response) => {
  response.json(newsList);
});

newsRouter.post('/', (request: Request, response: Response) => {
  var requestedNews : News[] = request.body;
  newsList = requestedNews;
  response.json(newsList)
});
