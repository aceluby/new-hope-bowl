
import { Router, Response, Request } from 'express';

const healthRouter: Router = Router();

healthRouter.get('/', (request: Request, response: Response) => {
  response.json({
    text: 'This app is so healthy!'
  });
});

export { healthRouter }
