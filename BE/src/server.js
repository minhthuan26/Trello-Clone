const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const route = require('./routes')
const connectDB = require('./db/connectDB')
const passport = require('passport')
const session = require('express-session')
const {DATABASE_URL, SECRET_KEY} = require('./config')

const app = express()
dotenv.config()
const port = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));
app.use(passport.initialize());
app.use(passport.session());

//route
route(app)

//start
const start = async () => {
    try{
        await connectDB(DATABASE_URL)
        .then(() => console.log('Connected to database...'))
        .catch(error => {
            console.log(error)
            process.exit(1)
        })
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }
    catch(error){
        console.log(error)
        process.exit(0)
    }
}

start()