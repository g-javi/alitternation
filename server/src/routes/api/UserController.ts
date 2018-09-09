import express from "express";
import MongoDb from "mongodb";
import { getDb } from "../../util/database";

const api = express.Router();

api.get("/balance/:googleId", (req, res, next) => {
    const googleId = req.params.googleId;
    
    const userDb = getDb().collection("users");
    userDb.find({"googleId": googleId}).toArray(function(err, result) {
        const balance = result[0].balance;
        const userBalance = {
            userId: googleId,
            balance: balance
        };
        res.send(userBalance);
    });
});

api.post("/balance/:googleId/:increaseAmount", (req, res, next) => {
    const googleId = req.params.googleId;
    const balanceIncrease = req.params.increaseAmount;

    const userDb = getDb().collection("users");

    userDb.find({"googleId": googleId}).toArray(function(err, result) {
        const newBalance = parseInt(result[0].balance) + parseInt(balanceIncrease);
        userDb.updateOne({"googleId": googleId}, {
            $set: {balance: newBalance},
            $currentDate: { lastModified: true }
        }, function(err, result) {            
            res.send({message: "Updated to " + newBalance});
        });
    });    
});

api.post("/clear/:googleId/", (req, res, next) => {
    const googleId = req.params.googleId;
    const userDb = getDb().collection("users");
    userDb.find({"googleId": googleId}).toArray(function(err, result) {
        const newBalance = 0;
        userDb.updateOne({"googleId": googleId}, {
            $set: {balance: newBalance},
            $currentDate: { lastModified: true }
        }, function(err, result) {            
            res.send({message: "Balance cleared for " + googleId});
        });
    });
});

export default api;
