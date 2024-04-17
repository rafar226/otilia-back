const express = require("express");

const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);
// await client.connect();
const UploadedDocument = require('../models/document')
const embeddingSchema = require("../models/embedding");
const { createEmbedding, main } = require('../embedding/createEmbedding')
const router = express.Router();
const { Configuration, OpenAI } = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/create", async (req, res) => {
  const text = req.body;

  const result = await main(text.input);
  res.json(result)
});

router.get("/test", async (req, res) => {
  const jsonTest = {
    test: "test"
  }
  
  res.json(jsonTest)
});


module.exports = router;


  // try {
  //   const database = client.db('Otilia');
  //   const embeddingDB = database.collection('embedding');
    
  //   // console.log(req.body.input)
  //   const embedding = await openai.embeddings.create({
  //     model: "text-embedding-ada-002",
  //     input: req.body.input,
  //     encoding_format: "float",
  //   });

  //   console.log('embedding', embedding)
  //   const newDoc = {
  //     description: 'text',
  //     embedding: embedding.data,
  //   }
  
  //   const savedDoc = await embeddingDB.insertOne(newDoc)
  
  //   res.status(201).json({
  //     message: 'Document uploaded successfully',
  //     document: savedDoc,
  //   })
  // } catch (err) {
  //   console.log('err: ', err)
  //   res.status(500).json({
  //     error: 'Internal server error',
  //     message: err.message,
  //   })
  
  // }


      // res.json(embedding.data)
