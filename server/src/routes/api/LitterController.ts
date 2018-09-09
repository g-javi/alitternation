import express from "express";
import { getDb } from "../../util/database"
import { ObjectID } from "mongodb";

const litter = express.Router();


litter.get("/items/:id", async (req, res, next) => {
    console.log("Request received:", "get", "/litter/items/:id");
    try {
        const litter = await getDb().collection("litter").find().toArray();
        const item = litter.find((item: any) => item._id.toString() ==  req.params.id);

        const barcodes = await getDb().collection("barcodes").find().toArray();
        const barcodeInformation = barcodes.find((barcodeItem) => barcodeItem.barcode == item.barcode);

        const disposalInstructions = await getDb().collection("instructions").find().toArray();
        const disposalInstructionInfo = disposalInstructions.find(x => x.material === item.disposalMethod);

        item.information = barcodeInformation;
        item.disposalInstruction = disposalInstructionInfo;

        if (item) {
            res.json(item)
        } else {
            res.json(null);
        }
    } catch (err) {
        console.log("Request error:", err);
        res.json(null);
    }
});

litter.get("/items", async (req, res, next) => {
    console.log("Request received:", "get", "/litter/items");
    try {
        const litter = await getDb().collection("litter").find().toArray();

        res.json(litter);
    } catch (err) {
        console.log("Request error:", err);
        res.json(null);
    }
});

litter.get("/barcode/:barcodeNumber", async (req, res, next) => {
    console.log("Request received:", "get", "/litter/barcode/:barcodeNumber");
    try {
        const litter = await getDb().collection("litter").find().toArray();
        const barcodeItems = litter.filter((item) => item.barcode);

        if (barcodeItems.length === 0) {
            res.json(null);
        }

        const item = barcodeItems.find((item) => item.barcode == req.params.barcodeNumber);
        if (item === undefined) {
            res.json(null);
        }

        const barcodes = await getDb().collection("barcodes").find().toArray();
        const barcodeInformation = barcodes.find((barcodeItem) => barcodeItem.barcode == item.barcode);
        
        const disposalInstructions = await getDb().collection("instructions").find().toArray();
        const disposalInstructionInfo = disposalInstructions.find(x => x.material === item.disposalMethod);

        item.information = barcodeInformation;
        item.disposalInstruction = disposalInstructionInfo;
        
        if(item) {
            res.json(item);
        } else {
            res.json(null);
        }
    } catch (err) {
        console.log("Request error:", err);
        res.json(null);
    }
});

litter.get("/instructions/:itemId", async (req, res, next) => {
    console.log("Request received:", "get", "/litter/instructions/:itemId");
    try {
        const item = await getDb().collection("litter").find({ _id: new ObjectID(req.params.itemId) }).toArray();

        const disposalMethod = item[0].disposalMethod;
        const instructions = await getDb().collection("instructions").find({ material: disposalMethod }).toArray();
        if (instructions) {
            res.json(instructions);
        } else {
            res.json(null);
        }
    } catch (err) {
        console.log("Request error:", err);
        res.json(null);
    }
});

litter.get("/records/all", async (req, res, next) => {
    console.log("Request received:", "get", "/litter/records/all");
    try {
        const records = await getDb().collection("records").find().toArray();
        if (records) {
            res.json(records);
        }
        else {
            res.json(null);
        }
    } catch (err) {
        console.log("Request error:", err);
        res.json(null);
    }
});

litter.post("/record", async (req, res, next) => {
    console.log("Request received:", "post", "/litter/record");
    try {
        const item = await getDb().collection("litter").find({ _id: new ObjectID(req.body.itemId) }).toArray();
        if (!item.length) {
            throw Error("Litter item does not exist");
        }

        const latitude = parseFloat(req.body.latitude);
        const longitude = parseFloat(req.body.longitude);
        const radius = parseFloat(req.body.radius);

        const record = {
            item: item[0],
            latitude: isNaN(latitude) ? null : latitude,
            longitude: isNaN(longitude) ? null : longitude,
            radius: isNaN(radius) ? null : radius,
            collected: req.body.collected,
            date: new Date()
        };
        await getDb().collection("records").insertOne(record);
        res.status(200).json(null);
    }
    catch (err) {
        console.log("Request error:", err);
        res.json(null);
    }
});

litter.post("/item/new", async (req, res, next) => {
    console.log("Request received:", "post", "/litter/item/new");

    // Expected interface for litter
    // "barcode": 8002270018794,
    // "description": "San Pellegrino Limonata",
    // "title": "San Pellegrino Limonata",
    // "recyclable": true,
    // "tags": ["glass", "bottle"],
    // "disposalMethod": "glass"
    try {
        const newItem = req.body;
        const result = await getDb().collection("litter").insertOne(newItem);
        if (result.insertedCount > 0) {
            const id = result.insertedId;
            res.json(id);
        } else {
            res.json(null);
        }
    } catch (err) {
        console.log("Request error:", err);
        res.json(null);
    }
});

export default litter;
