import express from "express";
import { getDb } from "../../util/database"
import { ObjectID } from "mongodb";

const litter = express.Router();


litter.get("/items/:id", async (req, res, next) => {
    const litter = await getDb().collection("litter").find().toArray();
    const item = litter.find((item: any) => item._id == req.params.id);
    
    if(item) {
        res.json(item)
    } else {
        res.json(null);
    }
});

litter.get("/items", async (req, res, next) => {
    const litter = await getDb().collection("litter").find().toArray();

    res.json(litter);
});

litter.get("/barcode/:barcodeNumber", async (req, res, next) => {
    // const litter = await addAllLitterData(getDb());
    const litter = await getDb().collection("litter").find().toArray();
    const barcodeItems = litter.filter((item) => item.barcode);

    const item = barcodeItems.find((item) => item.barcode == req.params.barcodeNumber);
    const barcodes = await getDb().collection("barcodes").find().toArray();
    const barcodeInformation = barcodes.find((barcodeItem) => barcodeItem.barcode == item.barcode);
    
    item.information = barcodeInformation;
    
    if(item) {
        res.json(item);
    } else {
        res.json(null);
    }
});

litter.get("/instructions/:itemId", async (req, res, next) => {
    const item = await getDb().collection("litter").find({ _id: new ObjectID(req.params.itemId) }).toArray();
    
    const disposalMethod = item[0].disposalMethod;
    const instructions = await getDb().collection("instructions").find({ material: disposalMethod }).toArray();
    if (instructions) {
        res.json(instructions);
    } else {
        res.json(null);
    }


});

litter.get("/records/all", async (req, res, next) => {
    const records = await getDb().collection("records").find().toArray();
    if(records){
        res.json(records);
    }
    else{
        res.json(null);
    }
});

litter.post("/record", async (req, res, next) => {
    try{
        const item = await getDb().collection("litter").find({ _id: new ObjectID(req.body.itemId) }).toArray();
        if(!item.length){
            throw Error("Litter item does not exist");
        }
        const record = {
            item: item[0],
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            radius: req.body.radius,
            collected: req.body.collected,
            date: new Date()
        };
        await getDb().collection("records").insertOne(record);
        res.status(200).json(null);
    }
    catch(e){
        console.log(e);
        res.status(500).json(null);
    }
});

litter.post("/item/new", async (req, res, next) => {
    const newItem = req.body;

    // Expected interface for litter
    // "barcode": 8002270018794,
    // "description": "San Pellegrino Limonata",
    // "title": "San Pellegrino Limonata",
    // "recyclable": true,
    // "tags": ["glass", "bottle"],
    // "disposalMethod": "glass"

    const result = await getDb().collection("litter").insertOne(newItem);
    if(result.insertedCount > 0) {
        const id = result.insertedId;
        res.json(id);
    } else {
        res.json(null);
    }

    
});

export default litter;