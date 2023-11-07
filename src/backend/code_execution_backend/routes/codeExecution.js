var express = require('express')
var router = express.Router();
const codeExecutorController = require("../controller/codeExecutorController");

router.get("/getLanguages", codeExecutorController.getLanguages);

router.get("/getLanguage/:id", codeExecutorController.getLanguage);

router.post("/createSubmission", codeExecutorController.createSubmission);

router.get("/getSubmission/:token", codeExecutorController.getSubmission);

module.exports = router;
