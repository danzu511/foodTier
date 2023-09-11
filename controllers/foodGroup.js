const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path'); // Import the path module to construct file paths

const foodGroupRouter = express.Router();

foodGroupRouter.get('/all', async (req, res) => {
    try {
        const foodCodesFolder = path.join(__dirname, '..', 'foodCodes');

        // Read the contents of the foodCodes folder
        fs.readdir(foodCodesFolder, (err, files) => {
            if (err) {
                res.status(500).json({ error: 'An error occurred while reading the folder.' });
            } else {
                // Remove file extensions (e.g., '.json') and send as an array
                const foodGroups = files.map((file) => path.parse(file).name);
                res.json(foodGroups);
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the data.' });
    }
});

foodGroupRouter.get('/:foodGroup', async (req, res) => {
    try {
        const { foodGroup } = req.params;
        const filePath = path.join(__dirname, '..', 'foodCodes', `${foodGroup}.json`);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the file and send it as JSON
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.status(500).json({ error: 'An error occurred while reading the file.' });
                } else {
                    const jsonData = JSON.parse(data);
                    res.json(jsonData);
                }
            });
        } else {
            res.status(404).json({ error: 'File not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the data.' });
    }
});

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = () => {
    foodGroupRouter.get('/:foodGroup', foodGroupRouter);
    foodGroupRouter.get('/all', foodGroupRouter);
    return foodGroupRouter;
}
