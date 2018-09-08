import express from "express";
import bodyParser from "body-parser";
import getConfig from "./util/getConfig";
import router from "./routes";
import passport from "passport";
import {connect} from "./util/database";
require("./util/GoogleAuth");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');



const config = getConfig();

// MongoDB database URI
const mongoUri = config.DATABASE.URI;

// PORT
const PORT = config.SERVER.PORT;

connect().then(() => {
    //Initialize as express application
    const app = express();

    app.use(cookieSession({
        name: 'session',
        keys: ['123']
    }));


    app.use(cookieParser());


    // parse request body
    app.use(bodyParser.urlencoded({ extended: true }));





    app.use(passport.initialize());
    app.use(passport.session());


    // Use router
    app.use(router);

    // Listen on PORT
    app.listen(config.SERVER.PORT);
   
    console.log('Listening on ' + config.SERVER.PORT);
});




