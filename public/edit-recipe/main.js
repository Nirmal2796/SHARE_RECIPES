

const recipeName = document.getElementById('recipe-name');
const recipeDescription = document.getElementById('description');
// const recipeImage = document.getElementById('recipe-image');
const recipePrepTime = document.getElementById('prep-time');
const dietary = document.getElementById('dietary');
const recipeDifficulty = document.getElementById('difficulty');
const main_ingredients = document.getElementById('main-ingredients');
const secondary_ingredients = document.getElementById('secondary-ingredients');
const recipeSteps = document.getElementById('steps');




const profile_menu_list = document.getElementById('profile_menu_list');

const recipe_form = document.getElementById('recipe-form');


recipe_form.addEventListener('submit', editRecipe);


let id;


//DOM CONTENT LOAD EVENT
document.addEventListener('DOMContentLoaded', DomLoad);


//DOM CONTENT LOADED
async function DomLoad() {
    try {
        await changeProfileMenu();
        await getRecipeDetails();
        window.scrollTo(0, 0);

    }
    catch (err) {
        console.log(err);
    }
}






//CHANGE PROFILE MENU
async function changeProfileMenu() {
    try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:3000/validate-token', { headers: { 'Auth': token } });

        if (res.data.status === 'success') {
            profile_menu_list.innerHTML = `
            <li><a href="../edit-profile/edit-profile.html">Edit Profile</a></li>
            <li><a href="../add-recipe/add-recipe.html">Add Recipe</a></li>
            <li><a href="../my-recipes/my-recipes.html">My Recipes</a></li>
            <li><a href="#">Favourite</a></li>
            <li><a href="#">Logout</a></li>
            `;
        }
        else {
            profile_menu_list.innerHTML = `
            <li><a href="../login/login.html">Login</a></li>`;
        }
    }
    catch (err) {
        console.log(err);
    }
}



//TOGGLE PROFILE MENU
function toggleProfileMenu() {
    var profileMenu = document.getElementById("profile_menu");
    profileMenu.classList.toggle("show");
}


//GET RECIPE DETAILS
async function getRecipeDetails() {
    try {

        const token = localStorage.getItem('token');


        //window.location.search will return ?redirect='';
        //new URLSearchParams() This takes the query string and turns it into an object-like structure that lets you easily work with the parameters.
        //Once you create a URLSearchParams object, you can:
        // Get specific parameter values.
        // Add or remove parameters.
        // Iterate over all the parameters.            
        const urlParams = new URLSearchParams(window.location.search);
         id = urlParams.get('id');

        // console.log(id);

        const res = await axios.get(`http://localhost:3000/get-recipe/${id}`, { headers: { 'Auth': token } });

        // console.log(res.data.recipeDetails);

        fillValues(res.data.recipeDetails);

    }
    catch (err) {
        console.log(err);
    }
}


//FILL VALUES IN FORM
function fillValues(recipeDetails) {
    try {

        recipeName.value = recipeDetails.recipe.name;
        recipeDescription.value = recipeDetails.recipe.description;
        recipePrepTime.value = recipeDetails.recipe.preptime;
        // dietary.value=recipeDetails.dietary;
        recipeDifficulty.value = recipeDetails.recipe.recipeDifficulty;

        setIngredientsValue(secondary_ingredients, recipeDetails.ingredients);

        recipeSteps.value=recipeDetails.recipe.steps;

    }
    catch (err) {
        console.log(err);
    }
}



//SET INGREDIENTS VALUE
function setIngredientsValue(ingredientsDiv, ingredients) {

    let mcount = 1;
    let scount=1;

    
    ingredients.forEach(ingredient => {
        
        if(ingredient.ingredient.ingredientTypeId == 1){
            addMainIngredient(mcount);
            const ingredientDiv = main_ingredients.querySelector(`#ingredient${mcount}`);
            ingredientDiv.querySelector(`input[name="ingredient[]"]`).value = ingredient.ingredient.name;
            ingredientDiv.querySelector(`input[name="quantity[]"]`).value = ingredient.quantity;
            mcount++;
        }
        else{
            addSecondaryIngredient(scount);
            const ingredientDiv = secondary_ingredients.querySelector(`#ingredient${scount}`);
            ingredientDiv.querySelector(`input[name="ingredient[]"]`).value = ingredient.ingredient.name;
            ingredientDiv.querySelector(`input[name="quantity[]"]`).value = ingredient.quantity;
            scount++;
        }
        
    });
    

}



//ADD MAIN INGREDIENT INPUT BOX
function addMainIngredient(count) {
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.classList.add('ingredient');
    newIngredientDiv.id=`ingredient${count}`;
    newIngredientDiv.innerHTML = `
         <input type="text" id="main_ingredient" name="ingredient[]" placeholder="Main Ingredient" required>
        <input type="text" id="main_quantity" name="quantity[]" placeholder="Quantity" required>
    `;
    main_ingredients.appendChild(newIngredientDiv);
}

//ADD SECONDARY INGREDIENT INPUT BOX
function addSecondaryIngredient(count) {
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.classList.add('ingredient');
    newIngredientDiv.id=`ingredient${count}`;
    newIngredientDiv.innerHTML = `
         <input type="text" name="ingredient[]" placeholder="Secondary Ingredient" required>
        <input type="text" name="quantity[]" placeholder="Quantity" required>
    `;
    secondary_ingredients.appendChild(newIngredientDiv);
}





//GET INGREDIENTS
function getIngredients(ingredientsDiv) {
    const ingredients = [];
    const ingredientDivs = ingredientsDiv.querySelectorAll('.ingredient');

    ingredientDivs.forEach(ingredientDiv => {
        const ingredient = {};
        console.log(ingredientDiv.querySelector('input[name="ingredient[]"]'));
        ingredient.name = ingredientDiv.querySelector('input[name="ingredient[]"]').value;
        ingredient.quantity = ingredientDiv.querySelector('input[name="quantity[]"]').value;
        ingredients.push(ingredient);
    });
    return ingredients;
}



//EDIT RECIPE
async function editRecipe(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const recipe = {
        recipeName: recipeName.value,
        recipeDescription: recipeDescription.value,
        // recipeImage: recipeImage.files[0],
        recipePrepTime: recipePrepTime.value,
        dietary: dietary.value,
        recipeDifficulty: recipeDifficulty.value,
        mainIngredients: getIngredients(main_ingredients),
        secondaryIngredients: getIngredients(secondary_ingredients),
        recipeSteps: recipeSteps.value
    }


    // console.log(recipe);
    // formData.append('secondary_ingredients', JSON.stringify(getIngredients(secondary_ingredients)));


    try {
        const res = await axios.post(`http://localhost:3000/edit-recipe/${id}`, recipe, { headers: { 'Auth': token } });

        console.log(res);
        if (res.data.status === 'success') {
            recipe_form.reset();
            alert('Recipe Edited successfully');
            window.scrollTo(0, 0);
            // window.location.href='../home/home.html';
        }
    }
    catch (err) {
        console.log(err);
    }
}
