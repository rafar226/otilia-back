const { OpenAI } = require('openai')
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);
const { openAiResponse } = require('./openAiResponse')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function createEmbedding(query) {
  
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: query,
    encoding_format: "float",
  });

  if(embedding.data.length) {
    return embedding.data[0].embedding;
  } else {
    throw new Error(`Failed to get embedding. Status code: ${embedding.status}`);
  }
}

async function findSimilarDocuments(embedding) {
  try {
      await client.connect();
      
      const db = client.db('Otilia'); // Replace with your database name.
      const collection = db.collection('embeddings'); // Replace with your collection name.

      const documents = await collection.aggregate([
        {"$vectorSearch": {
          "queryVector": embedding,
          "path": "plot_embedding",
          "numCandidates": 100,
          "limit": 5,
          "index": "defaultIndexOtilia",
            }}
        ]).toArray();
              
        return documents;
          } finally {
              await client.close();
          }
}

async function main(query) {
  try {
      const embedding = await createEmbedding(query);
      const similarDocuments = await findSimilarDocuments(embedding);
  
      const prompt = `Based on this context: ${similarDocuments[0].text} \n\n Query: ${query} \n\n Answer:`
      const answer = await openAiResponse(prompt)
      
      return answer;

  } catch(err) {
      console.error(err);
  }
}

module.exports = { createEmbedding, main }