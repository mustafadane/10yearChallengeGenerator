const router = require('express').Router()
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
require('../../secrets')
module.exports = router

passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: "/auth/callback"
},
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        console.log('accessT', accessToken)
        done(null, profile)
    }
))

router.get('/login', passport.authenticate('facebook'))

router.get('/callback', passport.authenticate('facebook', {
    successRedirect: '/gen',
    failureRedirect: '/'
}))

router.post('login', async (req, res, next) => {
    try {
      console.log('i dont know if i will ever need this.')
    }
    catch (err) {
        next(err)
    }
})
