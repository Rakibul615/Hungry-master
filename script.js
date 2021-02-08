const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.getElementById('meal-details-content');
const recipeCloseBtn = document.getElementById('ingredient-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealIngredient);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with strMeal amd also the ingredients
function getMealList() {
    let searchMeal = document.getElementById('search-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`)
        .then(response => response.json())
        .then(data => {

            let mealItem = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    mealItem += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                mealItem = "Sorry, we didn't find your favorite dish!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = mealItem;
        });
}


// get recipe of the meal
function getMealIngredient(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

// create a ingredient with dish picture
function mealRecipeModal(meal) {

    meal = meal[0];
    let mealItem = `
      
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        
        <div class = "ingredient-detail">
        <h3>${meal.strMeal}</h3>
            <h3>Ingredient:</h3>
            <li>${meal.strIngredient1}</li>
            <li>${meal.strIngredient2}</li>
            <li>${meal.strIngredient3}</li>
            <li>${meal.strIngredient4}</li>
            <li>${meal.strIngredient5}</li>
            <li>${meal.strIngredient6}</li>
            <li>${meal.strIngredient7}</li>
        </div>
        
        
    `;
    mealDetailsContent.innerHTML = mealItem;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}