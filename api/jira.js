
var OAuth = require('oauth').OAuth;
var fs = require('fs');

class Jira {
  constructor( express, app, bodyParser ){
    this.express = express ;
    this.app = app ;
    this.bodyParser = bodyParser;

    this.base_url = "https://insynium.atlassian.net" ;
    this.key = 'JiraIonic'  ;
    this.requestToken = "/plugins/servlet/oauth/request-token" ;
    this.acccessToken = "/plugins/servlet/oauth/access-token" ;
    this.pemType = "RSA-SHA1" ;
    this.pemFile = fs.readFileSync('api/jira.pem', 'utf8') ;
    this.callBack = "http://localhost:8100/api/jira/callback" ;
  }
  get( req, res ){
    var base_url = this.base_url ;
    var oa = new OAuth(
      base_url + this.requestToken , //request token
      base_url + this.acccessToken, //access token
      this.key , //consumer key
      // "YOUR_PEM_FILE_CONTENT", //consumer secret, eg. fs.readFileSync('jira.pem', 'utf8')
      // this.pemFile,
      this.pemFile ,
      '1.0', //OAuth version
      this.callBack, //callback url
      "RSA-SHA1");
      oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret) {
        if (error) {
            // console.log('Error:', error);
            // console.log( req ) ;
            res.send(
              'Error getting OAuth access token'
              + JSON.stringify( error )) ;
        } else {
            req.session.oa = oa;
            req.session.oauth_token = oauthToken;
            req.session.oauth_token_secret = oauthTokenSecret;
            return res.redirect( base_url + "/plugins/servlet/oauth/authorize?oauth_token=" + oauthToken);
        }
      });
  }
  callback( req, res ){
    console.log(req.query);
    var oa = new OAuth(
        req.session.oa._requestUrl,
        req.session.oa._accessUrl,
        req.session.oa._consumerKey,
        this.pemFile ,  // "YOUR_PEM_FILE_CONTENT",
        //consumer secret, eg. fs.readFileSync('jira.pem', 'utf8')
        req.session.oa._version,
        req.session.oa._authorize_callback,
        req.session.oa._signatureMethod);
    console.log(oa);

    oa.getOAuthAccessToken(
      req.session.oauth_token,
      req.session.oauth_token_secret,
      req.query.oauth_verifier,
      function(error, oauth_access_token, oauth_access_token_secret, results2) {
          if (error) {
              console.log('Error:', error);
              res.send('Error verifying OAuth access token');
          } else {
              // store the access token in the session
              req.session.oauth_access_token = oauth_access_token;
              req.session.oauth_access_token_secret = oauth_access_token_secret;

              // res.send({
              //     message: "successfully authenticated.",
              //     access_token: oauth_access_token,
              //     secret: oauth_access_token_secret
              // });

              // BACK TO ANGULAR
              // res.redirect(
              //   'http://localhost:8100/jira/callback?' +
              //   'access_token=' + oauth_access_token +
              //   '&oauth_access_token_secret=' + oauth_access_token_secret
              //    );

              res.redirect(
              'http://localhost:8100/api/getRes/id/type'
            );

          }
      });
  }
  getRes (req, res) {
    var consumer = new OAuth(
        this.base_url + this.requestToken , //request token
        this.base_url + this.acccessToken, //access token
        this.key, // "mykey",
        this.pemFile, // "YOUR_PEM_FILE_CONTENT", //consumer secret, eg. fs.readFileSync('jira.pem', 'utf8')
        '1.0',
        this.callBack, // "http://localhost:1337/jira/callback",
        "RSA-SHA1"
    );
    function callback(error, data, resp) {
        console.log(error);
        //data = JSON.parse(data);
        // console.log("data,", data, "error,", error);
        return res.send(data);
    }
    // 1/session
    // 2/project
    consumer.get( this.base_url+  "/rest/api/2/project",
      // req.session.oauth_token,
      // req.session.oauth_token_secret,
        "OAUTH_TOKEN", //authtoken
        "TOKEN_SECRET", //oauth secret
        callback);
  }
  get( req, res ){

      var request = require('request');
      var options = {
        url: 'https://insynium.atlassian.net/rest/api/2/project',
        headers: {
          'Authorization': 'Basic cGFzY2FsQGluc3luaXVtLmNvbTo3NDI4MHBhc2NhbA==',
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        }
      };

      function callback(error, response, body) {
        console.log( error ) ;
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          console.log(info.stargazers_count + " Stars");
          console.log(info.forks_count + " Forks");
          res.send( info ) ;
        }
      }

      request(options, callback);

  }
}

module.exports  = Jira ;
