const RecipeModal = ({ recipeText }) => {
  return (
    <div className="recipe-modal">
      <div className="recipe-modal-content">
        <div className="recipe-text" style={{ whiteSpace: 'pre-line' }}>
          {recipeText}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
