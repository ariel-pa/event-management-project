const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/session");

const { getUsersAll } = require("./../controllers/users");

/**
 * Get users
 */
router.get("/", authMiddleware, getUsersAll);

module.exports = router;