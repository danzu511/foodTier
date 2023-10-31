const express = require('express');
const axios = require('axios');
require('dotenv').config();

const GPTRouter = express.Router();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

GPTRouter.post('/generate-recipe', async (req, res) => {
  try {
    const { input } = req.body;
    
    if (!input) {
      console.log('input is required', input)
      return res.status(400).json({ error: 'Input is required.' });
    }

    // Construct a prompt for generating a recipe
    const prompt = `Generate a food recipe for ${input.people} with the following ingredients: ${input.ingredients.join(', ')}`;

    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt: prompt,
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 1000, // Adjust as needed
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });

    const recipe = response.data.choices[0].text;
    console.log('response.data', response.data)

    return res.status(200).json({ recipe,  });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'An error occurred while generating the recipe.' });
  }
});

module.exports = () => {
  return GPTRouter;
};

