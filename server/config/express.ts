import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as compression from 'compression';
import { default as routesFnc } from '../routes';
import * as favicon from 'serve-favicon';

const app: express.Application = express();
const CLIENT = path.join(path.resolve(__dirname, '../../client'));
const FAVICON = path.join(path.resolve(__dirname, '../../client/favicon.ico'));
const BOWLING_LEAGUE_UPLOADS = path.join(path.resolve(__dirname, '../uploads'));

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

if (process.env.NODE_ENV === 'production') {

  const forceSSL = function() {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(
          ['https://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  };

  app.use(forceSSL());

  // in production mode run application from dist folder
  app.use(express.static(CLIENT));
  app.use(express.static(CLIENT + '/assets', { maxAge: 86400000 /* 1d */ }));
  app.use(favicon(FAVICON));

  var nullfun = function () {};
  console.log = nullfun;
  console.info = nullfun;
  console.error = nullfun;
  console.warn = nullfun;

  // Define lazy loaded routes
}
console.log(BOWLING_LEAGUE_UPLOADS);
app.use('/uploads', express.static(BOWLING_LEAGUE_UPLOADS));

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
