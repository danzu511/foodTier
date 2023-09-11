import Table from './components/Table';
import FoodGroupSelector from './components/FoodGroupSelector';
import { useState } from 'react';

function App() {

  const [foodCodes, setfoodCodes] = useState(null);
  const [foodGroups, setFoodGroups] = useState([]);

  console.log('foodGroups: ', foodGroups);

  return (
    <div className="App">
      <FoodGroupSelector foodGroups={foodGroups} setFoodGroups={setFoodGroups} setfoodCodes={setfoodCodes} />
      <h1>Tier List</h1>
      <Table data={foodCodes} foodGroups={foodGroups}/>
    </div>

  );
}

export default App;


  
 /*  const foodCodes = [
    {
      "fdcId": 171969,
      "tier": "S",
      "description": "Crab"
    },
    {
      "fdcId": 2341378,
      "tier": "S",
      "description": "Chicken breast"
    },
    {
      "fdcId": 171287,
      "tier": "S",
      "description": "Egg"
    },
    {
      "fdcId": 2341449,
      "tier": "A",
      "description": "Chicken thigh"
    },
    {
      "fdcId": 168608 ,
      "tier": "A",
      "description": "Ground beef"
    },
    {
      "fdcId": 173847,
      "tier": "A", 
      "description": "Bison"
    },
    {
      "fdcId": 171955,
      "tier": "B",
      "description": "Cod"
    },
    {
      "fdcId": 172410,
      "tier": "B",
      "description": "Duck"
    },
    {
      "fdcId": 171620,
      "tier": "D",
      "description": "Bratwurst"
    },
  ]; */
