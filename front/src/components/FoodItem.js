import { useState, useEffect } from "react";
import axios from "axios";
import "./FoodItem.css";
import Calories from "./pics/Calories.webp";
import Fat from "./pics/Fat.webp";
import Protein from "./pics/Protein.webp";
import Carbs from "./pics/Carbs.webp";
import Fiber from "./pics/Fiber.webp";
import Sugar from "./pics/Sugar.webp";


const host = process.env.MY_HOST || 'localhost:3001';

const fetchPic = (fdcId, foodType) => {
    const dataUrl = `http://${host}/api/pics/${foodType}/${fdcId}.webp`;
    return dataUrl;
};

const Round = (num) => {
  if (num >= 1 && num <= 99) {
    // Round to the nearest natural number
    return Math.round(num);
  } else if (num >= 0 && num < 1) {
    // Round to one decimal place
    return Math.round(num * 10) / 10;
  } else {
    // Return the original number for other cases
    return num;
  }
};


const FoodItem = ({ fdcId, description, foodType, chosenFoods, setChosenFoods }) => {
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(`http://${host}/api/food/${fdcId}`);
        setFoodData(response.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchFoodData();
  }, [fdcId]);

  const handleImageClick  = () => {
    if(!chosenFoods.includes(description)){
      addChosenFood(description);
    };
    if(chosenFoods.includes(description)) {
      removeChosenFood(description);
    }
  };

  const removeChosenFood = (foodDescription) => {
    setChosenFoods((prevChosenFoods) =>
      prevChosenFoods.filter((food) => food !== foodDescription)
    );
  };

  const addChosenFood = (foodDescription) => {
    if (chosenFoods.includes(foodDescription)) {
      return;
    }
    setChosenFoods((prevChosenFoods) => [...prevChosenFoods, foodDescription]);
  };
  

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

  return (
    <div className={`foodItem ${chosenFoods.includes(description) ? 'info-visible' : ''}`} onClick={handleImageClick} title={foodData.description}>
      {foodData.fdcId && (
        <div>
          <h3>{description}</h3>
          <img
            src={fetchPic(foodData.fdcId, foodType)}
            alt={`Food with fdcId ${foodData.fdcId}`}
            style={{ background: "transparent", borderRadius: "10px" }}
          />
        </div>
      )}
      {chosenFoods.includes(description) && (
        <>
          <div className="Nutrition-info">
            <img src={Calories} alt="Fat Icon" />
            <p>Energy: {Round(foodData.calories)} kcal</p>
          </div>
          <div className="Nutrition-info">
            <img src={Fat} alt="Fat Icon" />
            <p>Fat: {Round(foodData.fat)} g</p>
          </div>
          <div className="Nutrition-info">
            <img src={Protein} alt="Protein Icon" />
            <p>Protein: {Round(foodData.protein)} g</p>
          </div>
          <div className="Nutrition-info">
            <img src={Carbs} alt="Carbs Icon" />
            <p>Carbs: {Round(foodData.carbs)} g</p>
          </div>
          <div className="Nutrition-info">
            <img src={Fiber} alt="Fiber Icon" />
            <p>Fiber: {Round(foodData.fiber)} g</p>
          </div>
          <div className="Nutrition-info">
            <img src={Sugar} alt="Sugar Icon" />
            <p>Sugar: {Round(foodData.sugar)} g</p>
          </div >
          <div className="Nutrition-info" title="fdcId is the USDA identification for a food item">
          <p>fdcId: {fdcId}</p>
          </div>
        </>
      )}
    </div>
  );
  
};

export default FoodItem;
