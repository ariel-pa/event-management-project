const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSing = async (user) => {
    const sign = await jwt.sign(
        {
        id: user.id,
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
    return sign;
};

const verifyToken = async (tokenJWT) => {
    try{
        return jwt.verify(tokenJWT, JWT_SECRET);
    }catch(e){
        return null;
    }
};

module.exports = {tokenSing, verifyToken};
