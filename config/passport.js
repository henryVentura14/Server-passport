var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var PassportLocal = require('passport-local').Strategy

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (user, done) {
  done(null, { id: 1, name: 'henry' })
})

passport.use(
  new GoogleStrategy(
    {
      clientID:'YOUR ID',
      clientSecret: 'YOUR CLIENT',
      callbackURL: 'YOUR SERVER AND PORT /auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      var userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken
      }
      done(null, userData)
    }
  )
)

passport.use(
  new PassportLocal(function (username, password, done) {
    if (username === 'henry.ventura14@gmail.com' && password === '1234567')
      return done(null, { id: 1, name: 'henry' })
    done(null, false)
  })
)
