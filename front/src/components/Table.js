import { useState } from "react";
import FoodItem from "./FoodItem";
import "./Table.css";
import Search from "./pics/Search.webp";

const tiers = ["S", "A", "B", "C", "D", "F"];

const tierBackgrounds = {
  S: 'linear-gradient(135deg, rgba(106, 13, 173, 0.5), rgba(106, 13, 173, 0.3))',
  A: 'linear-gradient(135deg, rgba(34, 139, 34, 0.3), rgba(34, 139, 34, 0.5))',
  B: 'linear-gradient(135deg, rgba(0, 0, 139, 0.5), rgba(0, 0, 139, 0.3))',
  C: 'linear-gradient(135deg, rgba(255, 219, 88, 0.3), rgba(255, 219, 88, 0.5))',
  D: 'linear-gradient(135deg, rgba(138, 43, 226, 0.5), rgba(138, 43, 226, 0.3))',
  F: 'linear-gradient(135deg, rgba(255, 69, 0, 0.3), rgba(255, 69, 0, 0.5))',
};

const Table = ({ data, chosenFoods, setChosenFoods }) => {
  //console.log('data: ', data);

  const [searchQuery, setSearchQuery] = useState("");

  // Organize data by tier
  const tieredData = {};
  if (data) {
    data.forEach((subArray) => {
      subArray.forEach((food) => {
        //console.log('food: ', food);
        if (!tieredData[food.tier]) {
          tieredData[food.tier] = [];
        }
        tieredData[food.tier].push(food);
      });
    });
  }
  //console.log('tieredData: ', tieredData);

  return (
    <div className="tier-list">
      <div className="tier-title">
        <img src= {Search} alt="Search" />
        <input
          type="text"
          placeholder="Search Food"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {tiers.map((tier) => (
        <div key={tier} className={`tier tier-${tier}`} style={{ backgroundImage: tierBackgrounds[tier] }}>
          <div className="tier-header">
            <h1>{tier}</h1>
          </div>
          <div className="tier-row">
            {tieredData[tier] && tieredData[tier].length > 0 ? (
              tieredData[tier]
                .filter((food) => food.description.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((food) => (
                  <div key={food.fdcId} className="tier-item">
                    <FoodItem fdcId={food.fdcId} description={food.description} foodType={food.type} chosenFoods={chosenFoods} setChosenFoods={setChosenFoods} />
                  </div>
                ))
            ) : (
              <div className="empty-tier-message"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Table;
