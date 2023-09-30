const express = require("express");
const router =express.Router();
const {createUser, loginUser} = require("../controllers/auth");

/**
 * Ruta para auth.js
 */

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router