var express = require('express') ;
var path = require('path') ;
var logger = require('morgan') ;
var cookierParser = require('cookie-parser');
var bodyParser = require('body-parser') ;
var session = require('express-session');

var http = require('http') ;
var Jira = require( './api/jira' ) ;

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

app.use( express.static(path.join(__dirname,'dist'))) ;

var proxy = require('express-http-proxy');

app.use('/proxy',
  proxy('insynium.atlassian.net',{
    https: true,
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
      // you can update headers
      proxyReqOpts.headers = srcReq.headers ;
      delete ( proxyReqOpts.headers['referer'] ) ;
      delete ( proxyReqOpts.headers['host'] ) ;
      return proxyReqOpts;
    },
    parseReqBody: true
  })
);

// var jira = new Jira( express, app, bodyParser ) ;

// app.use( '/api/jira/pem', ( req, res )=>{
//   jira.get( req, res ) ;
// } ) ;
// app.use( '/api/jira/callback', ( req, res )=>{
//   jira.callback( req, res ) ;
// } ) ;
// app.use( '/api/getRes/:id/:type', ( req, res )=>{
//   jira.getRes( req, res ) ;
// } ) ;
// app.use( '/api/get', ( req, res )=>{
//   jira.get( req, res ) ;
// } ) ;

// API location
// app.use('/api', api.router ) ;

// // api for inteacting with mongodb
// var api = require('./server/routes/api') ;

// send all other request to the angular app

app.get('*', (req, res)=> {
  res.sendFile( path.join(__dirname, 'dist/index.html') ) ;
});

app.set('port', port ) ;

const server = http.createServer(app);
// run server
server.listen(port, ()=> {
  console.log( `Running  on localhost:${port}`)
} );

/*
api.connection(
  'mongodb://localhost:27017/' ,
  'todo',
  ( db ) => {
    server.listen(port, ()=> console.log( `Running  on localhost:${port}`));
    // api.getTodos( ( data )=>{
    //   console.log( data )  ;
    // }, ()=>{} ) ;
  }
);
*/

