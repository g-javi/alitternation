import express from "express";
import { getDb } from "../../util/database"
import { addAllLitterData } from "../../util/retrieveFromDb";

const litter = express.Router();

litter.get("/items", async (req, res, next) => {
    const litter = await getDb().collection("litterData").find().toArray();

    res.json(litter);
});

litter.get("/barcode/:barcodeNumber", async (req, res, next) => {
    // const litter = await addAllLitterData(getDb());
    const litter = await getDb().collection("litterData").find().toArray();
    const barcodeItems = litter.filter((item) => item.barcode);

    const item = barcodeItems.find((item) => item.barcode == req.params.barcodeNumber);
    if(item) {
        res.json(item);
    } else {
        res.json(null);
    }


});

export default litter;