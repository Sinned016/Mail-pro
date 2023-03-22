import { fetchCollection } from "./src/mongo/emailMongoClient.js";

async function login(req, res) {
    let login = req.body;
    console.log(login)
    const users = await fetchCollection("users").findOne(login);

    if(users != null) {
        req.session.username = req.body.username;
        res.sendStatus(200)
        console.log("Session Username: " + req.session.username)
    } else {
        res.sendStatus(400)
    }
}

export default { login };