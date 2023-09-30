const { User } = require("../database/models/index")

/**
 * get users all
 * @param {*} req 
 * @param {*} res 
 */
const getUsersAll = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'firstName', 'lastName'],
        });

        res.status(201).json({
            message: "SUCCESSFULLY OBTAINED RECORDS",
            users
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
}


module.exports = { getUsersAll };