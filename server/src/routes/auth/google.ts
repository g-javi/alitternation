import passport from "passport";
import express from "express";

const google = express.Router();


google.get('/',
  passport.authenticate('google', { scope:
  	[ 'https://www.googleapis.com/auth/plus.login' ] }
));

google.get( '/callback',
	passport.authenticate('google', { failureRedirect: "/user-login"}),
	(req, res) => {
		res.cookie('user_details', JSON.stringify(req.user));
		res.redirect("/");
});

export default google;