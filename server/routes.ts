import { healthRouter } from './api/health/health';
import {bowlingLeagueRouter} from "./api/bowling/leagues";
import {openBowlingRouter} from "./api/bowling/open-bowling";
import {volleyballLeagueRouter} from "./api/volleyball/volleyball";
import {newsRouter} from "./api/news/news";
import {weddingRouter} from './api/weddings/weddings';
// TODO: fix these imports to be like the above
let request = require('request');
let HttpsAgent = require('agentkeepalive').HttpsAgent;
let xml2js = require('xml2js');

export default function(app) {

  // api routes
  //app.use('/api/health', healthRouter);
  app.use('/api/bowling_leagues', bowlingLeagueRouter);
  app.use('/api/open_bowling', openBowlingRouter);
  app.use('/api/volleyball_leagues', volleyballLeagueRouter);
  app.use('/api/news', newsRouter);
  app.use('/api/wedding', weddingRouter);

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

  let agent = new HttpsAgent();
  let parser = new xml2js.Parser({explicitArray : false, trim: true, ignoreAttrs: true, async: true});

  // define unknown routes (error handling) last

  app.route('/api/*')
    .all((req, res) => {
      res.send('Not Found');
    });

}
