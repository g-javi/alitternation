import * as fs from "fs";
import { MongoClient, Db } from "mongodb";

const collectionsToUpdate: any = [];

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if (index >= 2) {
        collectionsToUpdate.push(val);
    }
});

const collections = [
    "barcodes",
    "instructions",
    "litter",
    "users"
];

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, async function (err, db) {
    if (err) throw err;
    console.log("Connected to mongo");

    const myDb = db.db("myDb");

    for (let i = 0; i < collectionsToUpdate.length; i++) {
        console.log(collectionsToUpdate[i]);
        const index = collections.indexOf(collectionsToUpdate[i]);
        if (index !== -1) {
            await addCollectionData(myDb, collectionsToUpdate[i]);
        } else {
            console.log("Invalid collection name", collectionsToUpdate[i]);
        }
    }

    db.close();
});

async function addCollectionData(myDb: Db, collectionName: string) {
    const filePath = __dirname + "/../data/" + collectionName + ".json";
    let dataObj = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (collectionName === "litter" || collectionName === "barcodes") {
        dataObj = Object.keys(dataObj).map((obj) => dataObj[obj]).map((o) => {o.barcode += ''; return o;});
    }
    console.log(dataObj);
    for (const data in dataObj) {
        await myDb.collection(collectionName).insertOne(dataObj[data]);
    }
    console.log("All " + collectionName + " data added.");
}
