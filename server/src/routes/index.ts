import express from "express";
import LitterController from "./api/LitterController";
import SurveyController from "./api/SurveyController";
import auth from "./auth";


const router = express.Router();

router.get("/", (req, res, next) => {
    res.send("Hello World!");
})

router.use("/survey", SurveyController);
router.use("/litter", LitterController);
router.use("/auth", auth);



export default router;