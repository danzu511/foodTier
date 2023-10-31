import Table from './components/Table';
import FoodGroupSelector from './components/FoodGroupSelector';
import ChosenFoods from './components/ChosenFoods';
import { useState } from 'react';
import './App.css';

function App() {

  const [foodCodes, setfoodCodes] = useState(null);
  const [foodGroups, setFoodGroups] = useState([]);
  const [chosenFoods, setChosenFoods] = useState([]);

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