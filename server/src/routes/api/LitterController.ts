import express from "express";
import { getDb } from "../../util/database"
import { addAllLitterData } from "../../util/retrieveFromDb";
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

export default litter;