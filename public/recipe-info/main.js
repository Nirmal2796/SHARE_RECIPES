
const profile_menu_list = document.getElementById('profile_menu_list');
const recipeContent=document.getElementById('recipe-content');



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
async function getRecipeDetails(params) {
    try {

        const token = localStorage.getItem('token');


        //window.location.search will return ?redirect='';
        //new URLSearchParams() This takes the query string and turns it into an object-like structure that lets you easily work with the parameters.
        //Once you create a URLSearchParams object, you can:
        // Get specific parameter values.
        // Add or remove parameters.
        // Iterate over all the parameters.            
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        const res=await axios.get(`http://localhost:3000/get-recipe/${id}`,{headers :{'Auth' : token}});

        console.log(res.data.recipeDetails);

        showRecipeDetails(res.data.recipeDetails);

    }
    catch (err) {
        console.log(err);
    }
}

//SHOW RECIPE DETAILS
function showRecipeDetails(recipeDetails){

     recipeContent.innerHTML=`
    
                    <h2>${recipeDetails.recipe.name}</h2>
                    <p class="recipe-description">${recipeDetails.recipe.description}</p>


                    <h3>Main Ingredients:</h3>
                    <ul class="ingredients-list" id="main-ingredients-list">
                       
                    </ul>

                    <h3>Secondary Ingredients:</h3>
                    <ul class="ingredients-list" id="secondary-ingredients-list">
                        
                    </ul>

                    <h3>Recipe Steps:</h3>
                    <ol class="steps-list">
                        <li>${recipeDetails.recipe.steps}</li>
                    </ol>
                `


                recipeDetails.ingredients.forEach(ingredient => {
                    if(ingredient.ingredient.ingredientTypeId==1){

                        document.querySelector('#main-ingredients-list').innerHTML+=` <li>${ingredient.ingredient.name} - ${ingredient.quantity}</li>`
                    }
                    else{
                        document.querySelector('#secondary-ingredients-list').innerHTML+=` <li>${ingredient.ingredient.name} - ${ingredient.quantity}</li>`
                    }
                    console.log(ingredient);
               });

}