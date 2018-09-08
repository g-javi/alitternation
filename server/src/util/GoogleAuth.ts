// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
import passport from "passport";


import getConfig from "./getConfig";
const config = getConfig();
import { getDb } from "../util/database";
import PassportGoogleOAuth from 'passport-google-oauth2'
const GoogleStrategy = PassportGoogleOAuth.Strategy;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  
passport.use(new GoogleStrategy({
    clientID: config.AUTH.GOOGLE.CLIENT_ID,
    clientSecret: config.AUTH.GOOGLE.SECRET,
    callbackURL: config.AUTH.GOOGLE.CALLBACK_URL,
    passReqToCallback: true
},
    async function (request: any, accessToken: any, refreshToken: any, profile: any, done: any) {

        const db = getDb();

        const result = await db.collection("users").findOneAndUpdate(
            { googleId: profile.id },
            {
              $setOnInsert: { googleId: profile.id, balance: "0", firstName: profile.name.givenName, lastName:profile.name.familyName },
            },
            {
              returnOriginal: false,
              upsert: true,
            }
          );

        request.user = result.value;
        return done(null, result.value);

    }
));

