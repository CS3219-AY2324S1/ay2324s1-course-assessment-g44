require('dotenv').config();

const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const mongoString = "mongodb+srv://derrickkhoo2000:123465@questions.o1ost6e.mongodb.net/";
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());


// Set route file requirement and set app to use /routes directory
const questionRoutes = require('./routes/questionRoutes');
app.use('/routes', questionRoutes);

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
