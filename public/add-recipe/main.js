const recipeName = document.getElementById('recipe-name');
const recipeDescription = document.getElementById('description');
// const recipeImage = document.getElementById('recipe-image');
const recipePrepTime = document.getElementById('prep-time');
const recipeCookTime = document.getElementById('cook-time');
const recipeType=document.getElementById('recipe-type');
const dietary = document.getElementById('dietary');
const recipeDifficulty = document.getElementById('difficulty');
const main_ingredients = document.getElementById('main-ingredients');
const secondary_ingredients = document.getElementById('secondary-ingredients');
const recipeSteps = document.getElementById('steps');




const profile_menu_list = document.getElementById('profile_menu_list');

const recipe_form = document.getElementById('recipe-form');


recipe_form.addEventListener('submit', addRecipe);

//DOM CONTENT LOAD EVENT
document.addEventListener('DOMContentLoaded', DomLoad);


//DOM CONTENT LOADED
async function DomLoad() {
    try {
        // console.log('Dom Loaded');
        await changeProfileMenu();
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

        // const status='false';
        

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


//ADD MAIN INGREDIENT INPUT BOX
function addMainIngredient() {
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.classList.add('ingredient');
    newIngredientDiv.innerHTML = `
         <input type="text" id="main_ingredient" name="ingredient[]" placeholder="Main Ingredient" required>
        <input type="text" id="main_quantity" name="quantity[]" placeholder="Quantity" required>
    `;
    main_ingredients.appendChild(newIngredientDiv);
}

//REMOVE MAIN INGREDIENT INPUT BOX
function removeMainIngredient() {
    main_ingredients.lastChild.remove();
}


//ADD SECONDARY INGREDIENT INPUT BOX
function addSecondaryIngredient() {
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.classList.add('ingredient');
    newIngredientDiv.innerHTML = `
         <input type="text" name="ingredient[]" placeholder="Secondary Ingredient" required>
        <input type="text" name="quantity[]" placeholder="Quantity" required>
    `;
    secondary_ingredients.appendChild(newIngredientDiv);
}

//REMOVE SECONDARY INGREDIENT INPUT BOX
function removeSecondaryIngredient() {
    secondary_ingredients.lastChild.remove();
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



//ADD RECIPE
async function addRecipe(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const recipe = {
        recipeName: recipeName.value,
        recipeDescription: recipeDescription.value,
        // recipeImage: recipeImage.files[0],
        recipePrepTime: recipePrepTime.value,
        recipeCookTime:recipeCookTime.value,
        recipeType:recipeType.value,
        dietary: dietary.value,
        recipeDifficulty: recipeDifficulty.value,
        mainIngredients: getIngredients(main_ingredients),
        secondaryIngredients: getIngredients(secondary_ingredients),
        recipeSteps: recipeSteps.value
    }


    console.log(recipe);
    // formData.append('secondary_ingredients', JSON.stringify(getIngredients(secondary_ingredients)));


    try {
        const res = await axios.post('http://localhost:3000/add-recipe', recipe, { headers: { 'Auth': token } });

        console.log(res);
        if (res.data.status === 'success') {
            recipe_form.reset();
            alert('Recipe added successfully');
            window.scrollTo(0, 0);
            // window.location.href='../home/home.html';
        }
    }
    catch (err) {
        console.log(err);
    }
}
