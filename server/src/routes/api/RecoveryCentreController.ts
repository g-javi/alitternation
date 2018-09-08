import express from "express";
import { getDb } from "../../util/database";

const api = express.Router();

api.get("/all", (req, res, next) => {
    const bins = getDb().collection("resourceRecoveryCentres");
    return bins.find().toArray()  
    .then((resArray) => {
        res.json(resArray);
    })
    .catch((err:Error) => {
        console.log(err);
    });
});

export default api;