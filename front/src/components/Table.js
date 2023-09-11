import React from "react";
import FoodItem from "./FoodItem";
import "./Table.css"

const tiers = ["S", "A", "B", "C", "D", "F"];

const Table = ({ data, foodGroups }) => {
  console.log('data: ', data);

  // Organize data by tier
  const tieredData = {};
  if (data) {
    data.forEach((food) => {
      if (!tieredData[food.tier]) {
        tieredData[food.tier] = [];
      }
      tieredData[food.tier].push(food);
    });
  }
  console.log('tieredData: ', tieredData);

  const tierBackgrounds = {
    S: 'rgba(106, 13, 173, 0.2)', // Deep Purple
    A: 'rgba(34, 139, 34, 0.2)',  // Forest Green
    B: 'rgba(0, 0, 139, 0.2)',    // Deep Blue
    C: 'rgba(255, 219, 88, 0.2)', // Mustard
    D: 'rgba(138, 43, 226, 0.2)', // Clownish Purple
    F: 'rgba(255, 69, 0, 0.2)',   // Dangerous Red
  };

  return (
    <div className="tier-list">
      {tiers.map((tier) => (
        <div key={tier} className={`tier tier-${tier}`} style={{ backgroundColor: tierBackgrounds[tier] }}>
          <div className="tier-row">
            <h1 style={{ paddingLeft: '1em', paddingRight: '2em', paddingTop: '1em' }}>{tier}</h1>
            {tieredData[tier] && tieredData[tier].length > 0 ? (
              tieredData[tier].map((food) => (
                <div key={food.fdcId} className="tier-item">
                  <FoodItem fdcId={food.fdcId} description={food.description} foodGroups={foodGroups} />
                </div>
              ))
            ) : (
              <div className="empty-tier-message">No items in this tier</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Table;

