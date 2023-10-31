import React, { useState } from 'react';
import axios from 'axios';
import './ChosenFoods.css';
import RecipeModal from './RecipeModal';
import { MY_API } from '../config';

const ChosenFoods = ({ chosenFoods, setChosenFoods }) => {
  const [recipeGenerated, setRecipeGenerated] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [people, setPeople] = useState(2); // Default value is 2
  const [loading, setLoading] = useState(false);

  const removeFood = (foodToRemove) => {
    setChosenFoods((chosenFoods) =>
      chosenFoods.filter((food) => food.trim().toLowerCase() !== foodToRemove.trim().toLowerCase())
    );
  };

  const generateRecipe = () => {
    if (chosenFoods.length > 0) {
      setLoading(true);
      const requestBody = {
        input: {
          people: people, // Use the user-defined value
          ingredients: chosenFoods,
        },
      };

      axios
      .post(`${MY_API}/api/gpt/generate-recipe`, requestBody)
      .then((response) => {
        console.log('Generated Recipe:', response.data.recipe);
        setGeneratedRecipe(response.data.recipe);
        setRecipeGenerated(true);
      })
      .catch((error) => {
        console.error('Error generating recipe:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request completes
        setModalVisible(true); // Show the modal after the request completes
      });
  }
};

  const handleToggleModal = () => {
    setModalVisible(!modalVisible); // Toggle the modal visibility
  };

  const handlePeopleChange = (event) => {
    // Update the "people" state when the input field changes
    const value = event.target.value;
    setPeople(value);
  };

  return (
    <>
      <br />
      {chosenFoods.length > 0 && (
        <div className="chosen-foods">
          <div className="chosen-foods-list">
            <h2>Chosen Foods</h2>
            <ul>
              {chosenFoods.map((food) => (
                <li key={food}>
                  <span>{food}</span>
                  <button className="remove-food-button" onClick={() => removeFood(food)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="recipe-options">
            {chosenFoods.length > 0 && (
              <>
                <div className="people-input">
                  <label htmlFor="people">Number of People: </label>
                  <input
                    type="number"
                    id="people"
                    name="people"
                    min={1}
                    value={people}
                    onChange={handlePeopleChange}
                  />
                </div>
                <button className="recipe-button" onClick={generateRecipe}>
                  {loading ? 'Generating...' : recipeGenerated ? 'New Recipe' : 'Generate Recipe'}
                </button>
                {recipeGenerated && (
                  <button className="recipe-button" onClick={handleToggleModal}>
                    {modalVisible ? 'Hide Recipe' : 'View Recipe'}
                  </button>
                )}
              </>
            )}
          </div>
          {modalVisible && (
            <RecipeModal recipeText={generatedRecipe} onClose={handleToggleModal} />
          )}
        </div>
      )}
      <br />
    </>
  );
};

export default ChosenFoods;
