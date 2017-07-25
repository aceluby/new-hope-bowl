import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as compression from 'compression';
import { default as routesFnc } from '../routes';
import * as favicon from 'serve-favicon';

const app: express.Application = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
const CLIENT = path.join(path.resolve(__dirname, '../../client'));
const FAVICON = path.join(path.resolve(__dirname, '../../client/favicon.ico'));

app.set('x-powered-by', false);

// :(
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// register the proxy routes
require('./node-proxy')(app);

app.use(json({limit: '1000mb'}));
app.use(compression());
app.use(urlencoded({ extended: true }));


// allow cors only for local dev
app.use(cors({
  origin: 'http://localhost:4200'
}));

if (app.get('env') === 'production') {

  // in production mode run application from dist folder
  app.use(express.static(CLIENT));
  app.use(favicon(FAVICON));

  // Define lazy loaded routes
  app.use('/transfer-orders', express.static(CLIENT));
  app.use('/transfer-orders/*', express.static(CLIENT));
  app.use('/purchase-orders', express.static(CLIENT));
  app.use('/purchase-orders/*', express.static(CLIENT));
}

// register the routes for the api
routesFnc(app);

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
  let err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export { app }
