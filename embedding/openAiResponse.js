const { Configuration, OpenAI } = require('openai')
require('dotenv').config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function openAiResponse(prompt) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: false,
    temperature: 0.5,
    messages: [
      {
        role: 'system',
        content: 'You are a health and wellness assistant, who also offers online courses on topics related to health and wellness. and based on the context you will try to give the most appropriate answer. If the context is not enough to answer the user query, please try to answer it anyway. If the question is not medical, about health or his answer is not in the context, tell him that he only answers questions about health. Introduce yourself as Otilia'
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  return response?.choices[0]?.message?.content
}

module.exports = { openAiResponse }