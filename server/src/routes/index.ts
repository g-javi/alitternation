import express from "express";
import LitterController from "./api/LitterController";
import SurveyController from "./api/SurveyController";
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

    if(req.user) {
        res.json({
            user: req.user
        })
    } else {
        res.json({
            error: "Unauthorized"
        })
    }
});

router.use("/survey", SurveyController);
router.use("/litter", LitterController);
router.use("/auth", auth);

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req: any, res: any, next: any) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

export default router;