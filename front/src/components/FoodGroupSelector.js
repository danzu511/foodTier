
/* import axios from "axios";
import { useEffect, useState } from "react";

const FoodGroupSelector = ({ foodGroups, setFoodGroups, setfoodCodes }) => {
  const [selectedFoodGroup, setSelectedFoodGroup] = useState(""); // Add selectedFoodGroup state
  
  useEffect(() => {
    axios.get("http://localhost:3001/api/foodGroup/all")
      .then(response => {
        setFoodGroups(response.data);
        console.log('foodGroups: ', response.data);
      })
      .catch(error => {
        console.error("Error fetching food groups:", error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/foodGroup/${selectedFoodGroup}`)
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

export default FoodGroupSelector; */


import "./FoodGroupSelector.css";
import axios from "axios";
import { useEffect, useState } from "react";

const host = process.env.MY_HOST || 'localhost:3001';

const FoodGroupSelector = ({ foodGroups, setFoodGroups, setfoodCodes }) => {
  const [selectedFoodGroups, setSelectedFoodGroups] = useState([]);
  const [infoStates, setInfoStates] = useState({});

  // Fetch food groups
  useEffect(() => {
    axios.get(`http://${host}/api/foodGroup/all`)
      .then(response => {
        setFoodGroups(response.data);
      })
      .catch(error => {
        console.error("Error fetching food groups:", error);
      });
  }, [setFoodGroups]);

  // Fetch food codes for the selected food groups
  useEffect(() => {
    // Create an array of promises for fetching food codes
    const fetchFoodCodesPromises = selectedFoodGroups.map(selectedGroup => {
      return axios.get(`http://${host}/api/foodGroup/${selectedGroup}`);
    });

    // Execute all promises concurrently
    Promise.all(fetchFoodCodesPromises)
      .then(responses => {
        // Combine the results into a single array
        const foodCodes = responses.map(response => response.data);
        setfoodCodes(foodCodes);
      })
      .catch(error => {
        console.error("Error fetching food codes:", error);
      });
  }, [selectedFoodGroups, setfoodCodes]);

  // Function to update selectedFoodGroups and toggle info state for a specific food group
  const handleFoodGroupClick = (foodGroup) => {
    setSelectedFoodGroups(prevSelected => {
      if (prevSelected.includes(foodGroup)) {
        return prevSelected.filter(group => group !== foodGroup);
      } else {
        return [...prevSelected, foodGroup];
      }
    });

    // Toggle the info state for the specific food group
    setInfoStates(prevStates => ({
      ...prevStates,
      [foodGroup]: !prevStates[foodGroup]
    }));
  };

  return (
    <div className= "foodGroupSelector">
      <div className="foodGroupSelector-options">
        {foodGroups.map((foodGroup, index) => (
          <div
            key={index}
            onClick={() => handleFoodGroupClick(foodGroup)}
            className={`foodGroupItem ${infoStates[foodGroup] ? 'info-visible' : ''} ${selectedFoodGroups.includes(foodGroup) ? 'active-food-group' : ''}`}
          >
            <img src={`http://${host}/api/pics/${foodGroup}/sample.webp`} alt={`Sample for ${foodGroup}`} />
            <div className="foodGroupItem-title">
              <h3>{capitalizeFirstLetter(foodGroup)}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodGroupSelector;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}