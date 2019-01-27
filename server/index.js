const path = require('path')
const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const PORT = process.env.PORT || 8080
const axios = require('axios')

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser( async (id, done) => {
  try {
    done(null, id)
  } catch (error) {
    done(error)
  }
})

app.use(require('express-session')({
  secret: 'Cody cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/auth', require('./routes/auth'))

app.get('/token', async (req, res, next) => {
  try {
    if(req.session.passport){
      // const result = await axios.get(`https://graph.facebook.com/v3.2/me/photos?since=2008-01-01&until=2010-01-01&access_token=${req.session.passport.user}`)
      // console.log('result', result.data.data)
      res.send(req.session.passport.user)
    } else {
      res.send(null)
    }
  } catch (err) {
    next(err)
  }
})

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

  // error handling endware
app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})


app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
)
