import express from "express";
import { getDb } from "../../util/database"
import { addAllLitterData } from "../../util/retrieveFromDb";
import { ObjectID } from "mongodb";

const litter = express.Router();

litter.get("/items", async (req, res, next) => {
    const litter = await getDb().collection("litter").find().toArray();

    res.json(litter);
});

litter.get("/barcode/:barcodeNumber", async (req, res, next) => {
    // const litter = await addAllLitterData(getDb());
    const litter = await getDb().collection("litter").find().toArray();
    const barcodeItems = litter.filter((item) => item.barcode);

    const item = barcodeItems.find((item) => item.barcode == req.params.barcodeNumber);
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

export default litter;