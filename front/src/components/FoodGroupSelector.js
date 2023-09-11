import axios from "axios";
import { useEffect, useState } from "react";

const host = process.env.MY_HOST || 'localhost:3001';

const FoodGroupSelector = ({ foodGroups, setFoodGroups, setfoodCodes }) => {
  const [selectedFoodGroup, setSelectedFoodGroup] = useState(""); // Add selectedFoodGroup state
  
  // Fetch food groups from the API
  useEffect(() => {
    axios.get(`http://${host}/api/foodGroup/all`)
      .then(response => {
        setFoodGroups(response.data);
        console.log('foodGroups: ', response.data);
      })
      .catch(error => {
        console.error("Error fetching food groups:", error);
      });
  }, [setFoodGroups]);

  // Fetch food codes from the API
  useEffect(() => {
    axios.get(`http://${host}/api/foodGroup/${selectedFoodGroup}`)
      .then(response => {
        setfoodCodes(response.data);
      })
      .catch(error => {
        console.error("Error fetching food codes:", error);
      });
  }, [selectedFoodGroup, setfoodCodes]);

  // Function to update selectedFoodGroup
  const handleFoodGroupChange = (event) => {
    const newValue = event.target.value;
    setSelectedFoodGroup(newValue);
  };

  return (
    <div>
      <h1>FoodGroupSelector</h1>
      <select value={selectedFoodGroup} onChange={handleFoodGroupChange}>
        <option value="">Select a Food Group</option>
        {foodGroups.map((foodGroup, index) => (
          <option key={index} value={foodGroup}>
            {foodGroup}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FoodGroupSelector;

