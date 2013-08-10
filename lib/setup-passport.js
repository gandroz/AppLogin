var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({  
    domain:       'zygonie.auth0.com',
    clientID:     'dy9ftINKZSRP5ysJiuE9s1UQu7AanMyP',
    clientSecret: 'vJ6zHLP1CArgC4UiL7BpZDXp6mnaddq1f2gGPFIOUWo9Z7FnhJ_MUImslz9HNUw9',
    callbackURL:  'http://www.zygonie.com'
  }, function(accessToken, refreshToken, profile, done) {
    //Some tracing info
    console.log('profile is', profile);
    return done(null, profile);
  });

passport.use(strategy);

// This is not a best practice, but we want to keep things simple for now
passport.serializeUser(function(user, done) {
  done(null, user); 
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = strategy; 