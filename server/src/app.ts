import express from "express";
import bodyParser from "body-parser";
import getConfig from "./util/getConfig";
import router from "./routes";
import {connect} from "./util/database";


const config = getConfig();

// MongoDB database URI
const mongoUri = config.DATABASE.URI;

// PORT
const PORT = config.SERVER.PORT;

connect().then(() => {
    //Initialize as express application
    const app = express();

    // parse request body
    app.use(bodyParser.urlencoded({ extended: true }));

    // Use router
    app.use(router);


    // Listen on PORT
    app.listen(config.SERVER.PORT);

    console.log('Listening on ' + config.SERVER.PORT);
});




