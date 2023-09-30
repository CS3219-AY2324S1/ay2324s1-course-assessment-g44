// const express = require('express');

// const router = express.Router()

// const questionController = require('../controllers/question_controller');
// const { model } = require('mongoose');

// //Post question
// router.post("/addQuestion", questionController.addQuestion);

// // Update question
// router.patch("/updateQuestion", questionController.updateQuestion);

// // Delete question
// router.delete("/deleteQuestion", questionController.deleteQuestion);

// // Get all questions
// router.get("/getQuestions", questionController.getQuestions);

// module.exports = router;

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question_controller');

// Post question
router.post("/addQuestion", questionController.addQuestion);

// Update question
router.patch("/updateQuestion", questionController.updateQuestion);

// Delete question
router.delete("/deleteQuestion", questionController.deleteQuestion);

// Get all questions
router.get("/getQuestions", questionController.getQuestions);

module.exports = router;
