import express from "express";
import { getDb } from "../../util/database";

const api = express.Router();

api.get("/all", (req, res, next) => {
    const bins = getDb().collection("bins");
    const query = {};
    const projection = {
        "Geometry": 1
    };
    return bins.find(query, {fields:projection}).toArray()  
    .then((resArray) => {
        res.json(resArray.map((geometry) => {
            return {
                longitude: geometry.coordinates[0],
                latitude: geometry.coordinates[1]
            }
        }));
    })
    .catch((err:Error) => {
        console.log(err);
    });
});

export default api;