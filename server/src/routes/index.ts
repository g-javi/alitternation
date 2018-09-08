import express from "express";
import api from "./api";
import auth from "./auth";


const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Hello World!");
})

router.use("/api", api);
router.use("/auth", auth);




export default router;