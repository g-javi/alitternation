import * as fs from "fs";
import { MongoClient, Db } from "mongodb";

const data = [
    "barcodes",
    "instructions",
    "litter",
    "users"
];

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, async function (err, db) {
    if (err) throw err;
    console.log("Connected to mongo");

    const myDb = db.db("myDb");

    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        await addCollectionData(myDb, data[i]);
    }

    db.close();
});

async function addCollectionData(myDb: Db, collectionName: string) {
    const filePath = __dirname + "/../data/" + collectionName + ".json";
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const dataArray = Object.keys(data).map((obj) => data[obj]).map((o) => {o.barcode += ''; return o;});

    for (const data in dataArray) {
        await myDb.collection(collectionName).insertOne(dataArray[data]);
    }
    console.log("All " + collectionName + " data added.");
}


// "mongoimport --db=myDb --collection=bins bins.json"