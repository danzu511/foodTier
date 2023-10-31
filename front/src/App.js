import Table from './components/Table';
import FoodGroupSelector from './components/FoodGroupSelector';
import ChosenFoods from './components/ChosenFoods';
import { useState } from 'react';
import './App.css';

function App() {

  const [foodCodes, setfoodCodes] = useState(null);
  const [foodGroups, setFoodGroups] = useState([]);
  const [chosenFoods, setChosenFoods] = useState([]);

/*   console.log('foodGroups: ', foodGroups);
  console.log('foodCodes: ', foodCodes); */

  return (
    <div className="App">
      <div className="top-div">
      <FoodGroupSelector 
        foodGroups={foodGroups}
        setFoodGroups={setFoodGroups} 
        setfoodCodes={setfoodCodes} 
      />
      </div>
      <ChosenFoods chosenFoods={chosenFoods} setChosenFoods={setChosenFoods}/>
      <Table data={foodCodes} foodGroups={foodGroups} chosenFoods={chosenFoods} setChosenFoods={setChosenFoods}/>
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
