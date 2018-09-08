import express from "express";
import LitterController from "./api/LitterController";
import auth from "./auth";


const router = express.Router();

router.get('/', (req: any, res) => {
    // if (req.session.token) {
    //     res.cookie('token', req.session.token);
    //     res.json({
    //         status: 'session cookie set'
    //     });
    // } else {
    //     res.cookie('token', '')
    //     res.json({
    //         status: 'session cookie not set'
    //     });
    // }

    res.json({
        id: 1
    })
});

router.use("/litter", LitterController);
router.use("/auth", auth);



export default router;