const GoogleStrategy = require('passport-google-oauth20').Strategy
const GooglePlusStrategy = require('passport-google-plus-token')
const passport = require('passport')
require('dotenv').config()

RandomPassword = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/v1/auth/login-google/callback",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, next) => {
    try {
        const user = {
            username: profile.emails[0].value,
            password: RandomPassword(15),
            email: profile.emails[0].value
        }

        req.googleAccessToken = accessToken
        req.googleRefreshToken = refreshToken
        req.providerId = profile.id

        next(null, user)
    }
    catch (error) {
        next(error, false)
    }
}));

// passport.use(new GooglePlusStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     // callbackURL: "http://localhost:3000/api/v1/auth/login-google/callback",
//     passReqToCallback: true
// }, async (req, accessToken, refreshToken, profile, next) => {
//     try {
//         const user = {
//             username: profile.emails[0].value,
//             password: RandomPassword(15),
//             email: profile.emails[0].value
//         }

//         console.log(accessToken)
//         console.log(req)
//         console.log(profile.id)

//         req.accessToken = accessToken
//         req.refreshToken = refreshToken
//         req.providerId = profile.id

//         next(null, user)
//     }
//     catch (error) {
//         next(error, false)
//     }
// }));

passport.serializeUser((user, next) => {
    next(null, user);
});

passport.deserializeUser((user, next) => {
    next(null, user);
});



