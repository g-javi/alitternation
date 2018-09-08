

const environment = process.env.NODE_ENV || "development";

import * as fs from "fs";
import * as MongoDb from "mongodb";

const MongoClient = MongoDb.MongoClient;
const ObjectID = MongoDb.ObjectID;

const litterCollectionName = "litterData";
const userCollectionName = "userData";

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function (err: any, db: MongoDb.MongoClient) {
    if (err) throw err;
    console.log("Connected to mongo server");

    const myDb = db.db("myDb");

    // viewAllCollections(myDb);

    // viewAllDocumentsInCollection(myDb, "remainingSteps");

    // db.close();
});

function viewAllCollections(myDb: MongoDb.Db) {
    myDb.listCollections().toArray(function(err: any, result: any) {
        if (err) throw err;
        console.log("ALL COLLECTIONS");
        console.log(result);
    });
}

function viewAllDocumentsInCollection(myDb: MongoDb.Db, collectionName: string) {
    myDb.collection(collectionName).find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log("ALL DOCUMENTS IN", collectionName);
        console.log(result);
    });
}

function createNewCollection(myDb: MongoDb.Db, collectionName: string) {
    myDb.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log("Collection for " + collectionName + " created");
    });
}

function addCollectionEntry(myDb: MongoDb.Db, collectionName: string, data: any) {
    myDb.collection(collectionName).insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("Collection entry inserted");
    });
}

function addAllLitterData(myDb: MongoDb.Db) {
    const litterData = JSON.parse(fs.readFileSync("../../data/litter.json", "utf8"));
    for (let i = 0; i < litterData.length; i++) {
        myDb.collection(litterCollectionName).insertOne(litterData[i], function(err, res) {
            if (err) throw err;
        });
        console.log("All litter data added");
    }
}

function addAllUserData(myDb: MongoDb.Db) {
    const userData = JSON.parse(fs.readFileSync("../../data/users.json", "utf8"));
    for (let i = 0; i < userData.length; i++) {
        myDb.collection(userCollectionName).insertOne(userData[i], function(err, res) {
            if (err) throw err;
        });
        console.log("All user data added");
    }
}

function findUser(myDb: MongoDb.Db, usernames: string[]) {
    const results: any = [];
    for (let i = 0; i < usernames.length; i++) {
        const query = { username: usernames[i] };
        myDb.collection(userCollectionName).find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("RESULT");
            console.log(result);
            results.push(result);
        });
    }
    return results;
}

function findLitter(myDb: MongoDb.Db, tags: string[]) {
    const results: any = [];
    for (let i = 0; i < tags.length; i++) {
        const query = { tags: tags[i] };
        myDb.collection(litterCollectionName).find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log("RESULT");
            console.log(result);
            results.push(result);
        });
    }
    return results;
}
