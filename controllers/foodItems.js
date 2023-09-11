const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
require('dotenv').config();

const foodRouter = express.Router();

const API_KEY = process.env.FOOD_API_KEY;
const CACHE_FILE_PATH = 'food_cache.json';

// Middleware function to check cache and fetch from API if necessary
const cacheMiddleware = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    console.log('identifier: ', identifier);
    const cacheData = await readFromCache();
    
    //if foodItem is in cache, send to front end
    if (cacheData && cacheData[identifier]) {
      // Filter and transform the cached data before sending it to the front end
      //console.log('cacheData[identifier]: ', cacheData[identifier]);
      res.json(cacheData[identifier]);

    //if foodItem is not in cache, fetch from API
    } else {
      const apiUrl = `https://api.nal.usda.gov/fdc/v1/food/${identifier}?api_key=${API_KEY}`;
      console.log('apiUrl: ', apiUrl);
      const apiResponse = await axios.get(apiUrl);
      const foodData = apiResponse.data;

      await updateCache(identifier, foodData);

      // Filter and transform the API response data before sending it to the front end
      const filteredData = filterAndTransformData(foodData);
      // Send the filtered data to the front end
      res.json(filteredData);
    }
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({ error: 'An error occurred while fetching the data.' });
  }
};

// Function to filter and transform the data
const filterAndTransformData = (data) => {
  return {
    fdcId: data.fdcId,
    description: data.description,
    calories: getNutrientAmount(data, 1008), // Energy
    protein: getNutrientAmount(data, 1003),
    fat: getNutrientAmount(data, 1004),
    carbs: getNutrientAmount(data, 1005),
    fiber: getNutrientAmount(data, 1079),
    sugar: getNutrientAmount(data, 2000),
  };
};

const getNutrientAmount = (data, nutrientId) => {
  const nutrient = data.foodNutrients.find((nutrient) => nutrient.nutrient.id === nutrientId);
  return nutrient ? nutrient.amount : null;
};

const readFromCache = async () => {
  try {
    const cacheData = await fs.readFile(CACHE_FILE_PATH, 'utf8');
    return JSON.parse(cacheData);
  } catch (error) {
    return null;
  }
};

// Update cache file with new data (filtered)
const updateCache = async (key, value) => {
  try {
    const cacheData = await readFromCache() || {};
    
    // Filter and transform the data before storing it in the cache
    const filteredData = filterAndTransformData(value);
    
    cacheData[key] = filteredData;
    
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(cacheData), 'utf8');
  } catch (error) {
    console.error('Error updating cache:', error);
  }
};

// Export a function that attaches the cacheMiddleware to the router
module.exports = () => {
  foodRouter.get('/:identifier', cacheMiddleware);
  return foodRouter;
};
