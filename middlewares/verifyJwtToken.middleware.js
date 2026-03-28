import jwt from "jsonwebtoken";

function verifyJwtToken(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(400).json({ message: "JWT Token not provided !" });
    }

    
    const token = authorization.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "Token missing!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid JWT token." });
        }

        req.user = decoded;
        next();
    });
}

export default verifyJwtToken;