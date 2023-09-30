const { encrypt, compare } = require("./../helpers/handlePassword");
const { User } = require("../database/models/index")
const { tokenSing } = require("./../helpers/handleJwt");
const { handleHttpError, handleErrorResponse } = require("./../helpers/handleError");
const { registerForTheEvent } = require("./event");

/**
 * Register users
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            event_id,
        } = req.body;

        const checkIsExist = await User.findOne({
            where: { email: email },
        });

        if (checkIsExist) {
            handleErrorResponse(res, "USER EXISTS", 401);
            return;
        }

        const passwordHash = await encrypt(password);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });
        newUser.set("password", undefined, { strict: false });

        console.log(newUser.id, event_id);
        const newEventLogs = await registerForTheEvent(res, newUser.id, event_id)

        res.status(201).json({
            message: "SUCCESSFULLY REGISTERED",
            newUser,
            newEventLogs
        });
    } catch (e) {
        console.log(e);
        handleHttpError(res, e);
    }
}

/**
 * Login users
 * @param {*} req 
 * @param {*} res 
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email: email },
        });

        if (!user) {
            handleErrorResponse(res, 'USER NOT EXISTS', 404);
            return
        }

        const check = await compare(password, user.password);

        if (!check) {
            handleErrorResponse(res, 'PASSWORD INVALID', 401);
            return
        }

        user.set("password", undefined, { strict: false });
        const data = {
            token: await tokenSing(user),
            user
        }

        res.status(200).json({
            message: "SUCCESSFUL ACCESSES",
            data
        });
    } catch (e) {
        console.log(e)
        handleHttpError(res, 'ERROR EN LOGIN USER');
    }
}

module.exports = { createUser, loginUser };