import express from 'express';
import authControllers from '../../authControllers.js';
import authFilter from '../../authFilter.js';
import { fetchCollection } from '../mongo/emailMongoClient.js';

const router = express.Router();


//Fetching everything in database
router.get("/users/", async (req, res) => {
    const users = await fetchCollection("users").find().toArray()

    console.log(req.session.username);

    res.send(users)
})


//logging in
router.post("/users/login/", authControllers.login)


//Creating account
router.post("/user/", async (req, res) => {
    let user = req.body;
    console.log(user)

    user.inbox = []
    user.sent = []

    const result = await fetchCollection("users").updateOne({
        username: user.username}, 
        {$setOnInsert: user}, 
        {upsert: true});

    if(result.matchedCount != 1) {
        res.status(400).send("Username is already taken");
    } else {
        res.status(200).send("Account created")
    }
})

// sending mail
router.post("/user/send/", authFilter.authenticate, async (req, res) => {
    let mail = req.body;
    console.log(mail)
    console.log(req.session.username)

    // till
    const sendTo = await fetchCollection("users")
    .updateOne({username: mail.to}, {$push: { inbox: {from: req.session.username, message: mail.message}}})

    if (sendTo.matchedCount === 1) {
        //från
        const sendFrom = await fetchCollection("users")
        .updateOne({username: req.session.username}, {$push: { sent: {to: mail.to, message: mail.message}}})

        res.status(200).send("Email was sent");
    }   else {
        res.status(400).send("User was not found");
    }
})


router.post("/logout", authFilter.authenticate, (req, res) => {
    req.session.username = undefined;

    res.status(200).send("User was logged out")
})


router.get("/inbox", authFilter.authenticate, async (req, res) => {
    console.log(req.session.username)

    const userInfo = await fetchCollection("users").findOne({username: req.session.username});
    console.log(userInfo.inbox);
    res.send(userInfo.inbox);
})


router.get("/sent", authFilter.authenticate, async (req, res) => {
    console.log(req.session.username)

    const userInfo = await fetchCollection("users").findOne({username: req.session.username});
    console.log(userInfo.sent);
    res.send(userInfo.sent);
})

export default router;