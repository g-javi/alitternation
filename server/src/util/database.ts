import { MongoClient, Db } from "mongodb";
let db: Db;

export function connect(){
    return MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true })
    .then((conn) => {
        console.log("Connected to mongo server");

        db = conn.db("myDb");
    })
    .catch((err) => {
        console.log("ERROR CONNECTING TO DB: " + err);
    });
}

export function getDb(){
    return db;
}

