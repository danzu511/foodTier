const express = require('express');
const axios = require('axios');
require('dotenv').config();

const foodRouter = express.Router();

const API_KEY = process.env.FOOD_API_KEY;

foodRouter.get('/:identifier', async (request, response) => {
  try {
    const { identifier } = request.params;
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/food/${identifier}?api_key=${API_KEY}`;
    console.log('apiUrl: ', apiUrl)
    const apiResponse = await axios.get(apiUrl);
    const foodData = apiResponse.data;

    response.json(foodData);
  } catch (error) {
    response.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
});

module.exports = foodRouter;
