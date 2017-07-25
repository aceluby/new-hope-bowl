'use strict';
let proxy = require('http-proxy-middleware');
let url = require('url');

module.exports = (app) => {

  // add external api routes here that require an API key
  [

  ].forEach( (serverUrl) => {
    let parsed = url.parse(serverUrl);
    let path = '/api' + parsed.pathname;

    app.use(path, proxy({
      target      : parsed.protocol + '//' + parsed.host,   // ex: api-internal.target.com
      pathRewrite : (p) => {
        // check if query already exists, and add api key
        if (p.includes('?')) {
          p = p + '&key=' + process.env.API_KEY;
        } else {
          p = p + '?key=' + process.env.API_KEY;
        }
        return p.replace('/api/', '');   // ex: remove '/api' from /api/inventories/v1
      },
      changeOrigin: true,
      logLevel    : process.env.NODE_ENV === 'development' ? 'debug' : 'info',
      secure      : false
    }));

  });

  // this section is for services that do not require API keys
  [

  ].forEach( (serverUrl) => {
    let parsed = url.parse(serverUrl);
    let path = '/api' + parsed.pathname;

    app.use(path, proxy({
      target      : parsed.protocol + '//' + parsed.host,   // ex: api-internal.target.com
      pathRewrite : (p) => {
        return p.replace('/api/', '');   // ex: remove '/api' from /api/inventories/v1
      },
      changeOrigin: true,
      logLevel    : process.env.NODE_ENV === 'development' ? 'debug' : 'info',
      secure      : false
    }));

  });

};
