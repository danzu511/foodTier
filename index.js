const express = require('express');
const cors = require('cors');
const foodRouter = require('./controllers/foodItems');

const app = express();

app.use(cors());

const PORT = 3001;

app.use('/api/food', foodRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
