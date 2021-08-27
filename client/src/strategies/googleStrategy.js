const GoogleStrategy = require('passport-google-oauth20').Strategy


passport.use(new GoogleStrategy({
    clientID: '605738722309-uf8r0ll61ff54j9mtrhhhq15i1v8qpju.apps.googleusercontent.com',
    clientSecret: 'ZRR5np-UYNqnnQp2kZ-WzHY1',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));