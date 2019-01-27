const path = require('path')
const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const PORT = process.env.PORT || 8080

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser( async (id, done) => {
  try {
    console.log('what what', id)
    done(null, id)
  } catch (error) {
    done(error)
  }
})

app.use(require('express-session')({
  secret: 'Cody cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/auth', require('./routes/auth'))

app.get('/token', (req, res, next) => {
  try {
    console.log(req.session)
    if(req.session.passport){
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
