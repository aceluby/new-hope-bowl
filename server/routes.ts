import {bowlingLeagueRouter} from "./api/bowling/leagues";
import {openBowlingRouter} from "./api/bowling/open-bowling";
import {volleyballLeagueRouter} from "./api/volleyball/volleyball";
import {newsRouter} from "./api/news/news";
import {weddingRouter} from './api/weddings/weddings';
import {adminRouter} from './api/admin/admin';
import {emailRouter} from './api/email/email';

export default function(app) {

  // api routes
  //app.use('/api/health', healthRouter);
  app.use('/api/bowling_leagues', bowlingLeagueRouter);
  app.use('/api/open_bowling', openBowlingRouter);
  app.use('/api/volleyball_leagues', volleyballLeagueRouter);
  app.use('/api/news', newsRouter);
  app.use('/api/wedding', weddingRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/email', emailRouter)

  app.route('/api/ping')
    .get((req, res) => {
      res.send('OK');
    });

  app.route('/health')
    .get((req, res) => {
      res.status(200).send('OK');
    });

  app.route('/api/key')
    .get((req, res) => {
      res.send( { key: process.env.API_KEY.toString() } );
    });

  app.route('/api/headers')
    .get((req, res) => {
      res.send( {
        env: process.env.MYORDER_ENV || 'PROD',
        user_id: req.get('USER-I') || '',
        ad_groups: req.get('APP_GROUPS') || '',
      } );
    });


  app.route('/api/*')
    .all((req, res) => {
      res.send('Not Found');
    });

}
