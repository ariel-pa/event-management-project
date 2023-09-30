const {handleHttpError} = require("../helpers/handleError");
const { verifyToken } = require("../helpers/handleJwt");

const authMiddleware  = async (req, res, next) => {
    try{
        if(!req.headers.authorization){
            handleHttpError(res, "NEED SESSION", 401);
            return
        }

        const token  = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken){
            handleHttpError(res, "NOT PAYLOAD DATA", 401);
            return
        }

        next();
    }catch(e){
        handleHttpError(res, "NOT SESSION", 401);
    }
}

module.exports = {authMiddleware}