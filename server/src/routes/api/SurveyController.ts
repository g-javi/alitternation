import express from "express";
import MongoDb from "mongodb";
import { getDb } from "../../util/database";

const MongoClient = MongoDb.MongoClient;
const api = express.Router();



api.get("/all", (req, res, next) => {
    const survey = getDb().collection("survey");
    const query = {};
    const projection = {
        "Council": 1,
        "Location": 1,
        "Latitude": 1,
        "Longitude": 1,
        "Estimated location size": 1,
        "Total number of items": 1
    };
    return survey.find(query, {fields:projection}).toArray()  
    .then((resArray) => {
        res.json(resArray);
    })
    .catch((err:Error) => {
        console.log(err);
    });
});

export default api;