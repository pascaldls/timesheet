var express = require('express') ;
var path = require('path') ;
var logger = require('morgan') ;
var cookierParser = require('cookie-parser');
var bodyParser = require('body-parser') ;
var session = require('express-session');

var http = require('http') ;

//Set port
const port = process.env.port || '8100' ;

var app = express() ;
app.use(session({ secret: 'red', saveUninitialized: true, resave: true }));

// Parsers
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({
  extended : true
}));
app.use( cookierParser()) ;
app.use( logger('dev') ) ;

app.use( express.static(path.join(__dirname,'../dist'))) ;

var proxy = require('express-http-proxy');

app.use('/proxy',
  proxy('insynium.atlassian.net',{
    https: true,
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
      // you can update headers
      // console.log ( proxyReqOpts.headers ) ;
      proxyReqOpts.headers = srcReq.headers ;
      proxyReqOpts.headers['user-agent'] = '' ;
      delete ( proxyReqOpts.headers['referer'] ) ;
      delete ( proxyReqOpts.headers['host'] ) ;
      return proxyReqOpts;
    },
    proxyReqBodyDecorator: function(bodyContent, srcReq) {
      console.log( bodyContent ) ;
      return bodyContent ;
      // return bodyContent.split('').reverse().join('');
    }
  })
);

// API location

app.get('*', (req, res)=> {
  res.sendFile( path.join(__dirname, 'dist/index.html') ) ;
});

app.set('port', port ) ;

const server = http.createServer(app);
// run server

exports.run = function(callback) {
  // run server
  server.listen(port, () => {
    console.log(`Running on localhost: ${port}`);
    callback(app);
  });
};
