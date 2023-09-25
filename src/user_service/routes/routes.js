const express = require("express");
const router = express.Router();

const userController = require("../controller/user-controller");

router.post("/registerUser", userController.createUser);

module.exports = router;