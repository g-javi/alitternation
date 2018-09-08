

const environment = process.env.NODE_ENV || "development";

import * as MongoDb from "mongodb";

const MongoClient = MongoDb.MongoClient;
const ObjectID = MongoDb.ObjectID;

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
