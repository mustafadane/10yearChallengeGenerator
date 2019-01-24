const router = require('express').Router()
const passport = require('passport')
const FacebookStrategy = require('passport-fascebook').Strategy

module.exports = router

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: "/auth/callback"
},
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        done(null, user)
    }
))

router.get('/login', passport.authenticate('facebook'))

router.get('/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/fail'
}))

router.post('login', async (req, res, next) => {
    try {
      console.log('i dont know if i will ever need this.')
    }
    catch (err) {
        next(err)
    }
})
