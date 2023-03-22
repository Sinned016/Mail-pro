function authenticate(req, res, next) {
    console.log(req.session.username);

    if (req.session.username === undefined) {
        console.log("User needs to login first")
        
        res.send("User needs to login first!")
    } else {
        next(); //om sessionen har ett användarnamn, gå vidare
    }
}

export default { authenticate };