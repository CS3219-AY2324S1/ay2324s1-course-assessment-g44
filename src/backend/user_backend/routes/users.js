var express = require('express');
var router = express.Router();
const userController = require("../controller/user-controller");

router.post(`/loginUser`, userController.loginUser);

router.post(`/createUser`, userController.createUser);

router.post(`/getUser`, userController.getUser);

router.post(`/updateUser`, userController.updateUser);

router.post(`/deleteUser`, userController.deleteUser);

module.exports = router;


