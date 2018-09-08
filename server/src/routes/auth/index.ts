import express from "express";
import google from "./google";

const auth = express.Router();

auth.post("/register", (req, res, next) => {

})

auth.post("/login", (req, res, next) => {
    
})


auth.get('/logout', (req: any, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

auth.use("/google", google);


export default auth;