import passport from "passport";
import express from "express";

const google = express.Router();


google.get('/',
  passport.authenticate('google', { scope:
  	[ 'https://www.googleapis.com/auth/plus.login' ] }
));

google.get( '/callback',
	passport.authenticate( 'google', {
		successRedirect: "/",
		failureRedirect: '/login'
}));

export default google;