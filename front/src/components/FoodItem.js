import { useState, useEffect } from "react";
import axios from "axios";
import "./FoodItem.css";

const host = process.env.MY_HOST || 'localhost:3001';

const fetchPic = (fdcId, foodGroups) => {
    const dataUrl = `http://${host}/api/pics/${foodGroups}/${fdcId}.webp`;
    return dataUrl;
};

const FoodItem = ({ fdcId, description, foodGroups }) => {
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);

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

  const handleImageClick = () => {
    setInfo((prevInfo) => !prevInfo); // Toggle info state
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
    <div className={`foodItem ${info ? 'info-visible' : ''}`} 
    onClick={handleImageClick}
    title={foodData.description}>
      {foodData.fdcId && (
        <div>
            <h3>{description}</h3>
            <img
            src={fetchPic(foodData.fdcId, foodGroups)}
            alt={`Food with fdcId ${foodData.fdcId}`}
            style={{ background: "transparent", borderRadius: "10px" }}
            />
        </div>
      )}
      {info && ( // Display info if info state is true
        <>
          <p>Calories: {foodData.calories} kcal</p>
          <p>Protein: {foodData.protein} grams</p>
          <p>Fat: {foodData.fat} grams</p>
          <p>Carbs: {foodData.carbs} grams</p>
          <p>Fiber: {foodData.fiber} grams</p>
          <p>Sugar: {foodData.sugar} grams</p>
          <p>fdcId: {fdcId}</p>
        </>
      )}
    </div>
  );
};

export default FoodItem;
