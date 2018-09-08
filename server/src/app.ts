import express from "express";
import bodyParser from "body-parser";
import getConfig from "./util/getConfig";
import router from "./routes/";
import passport from "passport";
import { connect } from "./util/database";
require("./util/GoogleAuth");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const cors = require('cors')


const config = getConfig();

// MongoDB database URI
const mongoUri = config.DATABASE.URI;

// PORT
const PORT = config.SERVER.PORT;

connect().then(() => {
    //Initialize as express application
    const app = express();
    app.use(cors());

    app.use(cookieSession({
        name: 'alitternation_session',
        keys: ['123']
    }));

    app.use(cookieParser());

    // parse request body
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(passport.initialize());
    app.use(passport.session());

    // Use router
    app.use('/', express.static(path.join(__dirname, '/static')));
    app.use('/image-capture', express.static(path.join(__dirname, '/static')));
    app.use('/item-lookup', express.static(path.join(__dirname, '/static')));
    app.use('/item-detail-info/:id', express.static(path.join(__dirname, '/static')));
    app.use('/user-info', express.static(path.join(__dirname, '/static')));
    app.use('/user-sign-in', express.static(path.join(__dirname, '/static')));

    
    app.use(router);
    console.log(path.join(__dirname, '/static'));

    // Listen on PORT
    app.listen(config.SERVER.PORT);

    console.log('Listening on ' + config.SERVER.PORT);
});




