const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ error: "Unauthorized person" });

        const verified = jwt.verify(token, "TokenPassword");
        req.userID = verified.id;
        req.email = verified.email;

        next()

    } catch (err){
        console.error(err)
        res.status(401).json({ error: "Unauthorized person" });
    }
}

module.exports = auth;