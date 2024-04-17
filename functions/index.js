const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const embeddingRoute = require("../routes/embedding");
const serverless = require('serverless-http');

// settings
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;

//middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));

// routes
app.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.send('Works')
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

  // app.use(embeddingRoute);
app.use('/.netlify/functions/index', embeddingRoute);

// server listening
// app.listen(port, () => console.log("Server listening to", port));
module.exports.handler = serverless(app);
