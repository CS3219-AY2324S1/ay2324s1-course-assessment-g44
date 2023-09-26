require('dotenv').config();

const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Import your questionController and any other required dependencies here.
const questionController = require('./controllers/question_controller');

// Define your routes directly in the index.js file.
// Post question
app.post("/addQuestion", questionController.addQuestion);

// Update question
app.patch("/updateQuestion", questionController.updateQuestion);

// Delete question
app.delete("/deleteQuestion", questionController.deleteQuestion);

// Get all questions
app.get("/getQuestions", questionController.getQuestions);

mongoose.connect(mongoString)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Listening on port', PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});
