var express = require('express');
var router = express.Router();
const userController = require("../controller/user-controller");

router.post(`/loginUser`, userController.loginUser);

router.post(`/createUser`, userController.createUser);

router.get(`/getUser/:token`, userController.getUser);

router.patch(`/updateUser/:token`, userController.updateUser);

router.delete(`/deleteUser/:token`, userController.deleteUser);

router.post(`/userMarkQuestionAsCompleted`, userController.userMarkQuestionAsCompleted);

router.post(`/userMarkQuestionAsIncomplete`, userController.userMarkQuestionAsIncomplete);

router.post(`/isAdminOrUser`, userController.isUserOrAdmin);

router.post(`/submitAttempt`, userController.submitAttempt);

router.get(`/getAttempts`, userController.getAttempts);

router.get(`/getQuestionsAttemptedPerUser`, userController.getQuestionsAttemptedPerUser);

router.get(`/getAttemptsPerQuestion`, userController.getAttemptsPerQuestion);

router.get(`/getLanguageUsage`, userController.getLanguageUsage);

module.exports = router;


