const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const createFoodRouter = require('./controllers/foodItems'); // Import the router creation function
const createFoodGroupRouter = require('./controllers/foodGroup'); // Import the router creation function
const createGPTRouter = require('./controllers/GPT'); // Import the router creation function

const app = express();

app.use(cors());

const PORT = 3001;

// Use the createFoodRouter function to create the router with cache middleware
const foodRouter = createFoodRouter();
const foodGroupRouter = createFoodGroupRouter();
const GPTRouter = createGPTRouter();

app.use(express.json()); // Enable parsing JSON bodies
app.use('/api/foodGroup', foodGroupRouter)
app.use('/api/food', foodRouter);
app.use('/api/gpt', GPTRouter);

const picsDirectory = path.join(__dirname, 'pics'); // Construct the absolute path
app.use('/api/pics', express.static(picsDirectory)); // Serve the pics directory as static files


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
