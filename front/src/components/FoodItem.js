import { useState, useEffect } from "react";
import axios from "axios";


const FoodItem = ({ fdcId }) => {
    const [foodData, setFoodData] = useState(null);
    const [macros, setMacros] = useState(null); // [calories, protein, fat, carbs]
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchFoodData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/food/${fdcId}`);
            setFoodData(response.data);
            console.log('response.data: ', response.data)
            const energy = response.data.foodNutrients.find(nutrient => nutrient.nutrient.id === 1008)
            console.log('energy: ', energy)
            const protein = response.data.foodNutrients.find(nutrient => nutrient.nutrient.id === 1003)
            const fat = response.data.foodNutrients.find(nutrient => nutrient.nutrient.id === 1004)
            const carbs = response.data.foodNutrients.find(nutrient => nutrient.nutrient.id === 1005)
            setMacros([energy, protein, fat, carbs])
        } catch (error) {
            setError(true);
        }
        };
    
        fetchFoodData();
    }, [fdcId, macros]);
    
    if (error) {
        return (
        <div>
            <p>There was an error fetching the data.</p>
        </div>
        );
    }
    
    if (!foodData) {
        return (
        <div>
            <p>Loading...</p>
        </div>
        );
    }
    console.log('macros: ', macros)
    
    return (
        <div>
        <h2>{foodData.description}</h2>
        <p>Category: {foodData.categoryDescription}</p>
        <p>Food group: {foodData.foodCategory}</p>
        <p>Portion size: {foodData.servingSize}</p>
        <p>Portion size: {foodData.servingSizeUnit}</p>
        </div>
    );
    }

export default FoodItem;