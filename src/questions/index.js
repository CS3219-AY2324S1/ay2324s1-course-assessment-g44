require('dotenv').config();

const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes');
app.use('/questions', routes)

mongoose.connect(mongoString)
.then(() => {
    app.listen(PORT, () => {
      console.log('listening on port', PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})