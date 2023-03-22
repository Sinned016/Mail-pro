import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import router from './src/router/router.js';
import cors from 'cors';
import sessionHandler from './src/middleware/sessionHandler.js';


const addr = "localhost";
const port = 3030;
const app = express();

app.use(cors());
app.use(express.json()); // Data som kommer in går från json till javascript object


// Register session handler for all requests
app.use(sessionHandler);


// Kollar om allt fungerar
app.get("/health", (req, res) => {
    console.log("Server is up")
    res.send("Server is up")
})


//Routers
app.use("/api", router);


//Listening for the answer
app.listen(port, addr, () => {
    console.log("Server listening on port " + port);
})