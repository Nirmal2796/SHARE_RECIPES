
const profile_menu_list = document.getElementById('profile_menu_list');
const recipe_section=document.querySelector('.recipe-section');




//DOM CONTENT LOAD EVENT
document.addEventListener('DOMContentLoaded', DomLoad);


//DOM CONTENT LOADED
async function DomLoad() { 
    try{
        await changeProfileMenu();
        await getMyRecipes();
        window.scrollTo(0, 0);

    }
    catch(err){
        console.log(err);
    } 
}






//CHANGE PROFILE MENU
async function changeProfileMenu() {
    try{
        const token=localStorage.getItem('token');

        const res=await axios.get('http://localhost:3000/validate-token',{ headers: { 'Auth': token } });

        if(res.data.status==='success'){
            profile_menu_list.innerHTML=`
             <li><a href="#">My Profile</a></li>
            <li><a href="../add-recipe/add-recipe.html">Add Recipe</a></li>
            <li><a href="../my-recipes/my-recipes.html">My Recipes</a></li>
            <li><a href="#">Favourite</a></li>
            <li><a href="#">Logout</a></li>
            `;
        }
        else{
            profile_menu_list.innerHTML=`
            <li><a href="../login/login.html">Login</a></li>`;
        }
    }
    catch(err){
        console.log(err);
    }
}



//TOGGLE PROFILE MENU
function toggleProfileMenu() {
    var profileMenu = document.getElementById("profile_menu");
    profileMenu.classList.toggle("show");
}

//GET MY RECIPES
async function getMyRecipes() {
    try{

        const token=localStorage.getItem('token');

        const res=await axios.get('http://localhost:3000/my-recipes',{headers:{'Auth':token}});

        // console.log(res.data);

        res.data.recipes.forEach(recipe => {
            showRecipes(recipe);
        });

    }
    catch(err){
        console.log(err);
    }
    
}


//SHOW MY RECIPES
function showRecipes(recipe){

    const newRecipe=`<div class="recipe-card" id=${recipe.id}>
                    <img src="" alt="Recipe Image">
                    <h2>${recipe.name}</h2>
                    <p>${recipe.description}</p>
                    <a href="../recipe-info/recipe-info.html?id=${recipe.id}">View Recipe</a>
                    <div class="my-recipe-options">
                        <i class="fa fa-pencil" aria-hidden="true" onclick="editRecipe(${recipe.id})"></i>
                        <i class="fa fa-trash" aria-hidden="true" onclick="deleteRecipe(${recipe.id})"></i>
                    </div>
                </div>`;
    
    recipe_section.innerHTML+=newRecipe;
}

//DELETE RECIPE
async function deleteRecipe(id){
    try{
        const token=localStorage.getItem('token');

        const res=await axios.delete(`http://localhost:3000/delete-recipe/${id}`,{headers:{'Auth':token}});

        alert(res.data.message);

        const recipe=document.getElementById(id);
        
        recipe_section.removeChild(recipe);

    }
    catch(err){
        console.log(err);
    }
}

//EDIT RECIPE
function editRecipe(id){

    try{
        // console.log(id);
            window.location.href=`../edit-recipe/edit-recipe.html?id=${id}`;
    }
    catch(err){
        console.log(err);
    }
}

