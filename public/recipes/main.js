

const profile_menu_list = document.getElementById('profile_menu_list');




document.querySelector('.view-categories-arrow').addEventListener('click', showCategories);


//DOM CONTENT LOAD EVENT
document.addEventListener('DOMContentLoaded', DomLoad);


//DOM CONTENT LOADED
async function DomLoad() { 
    try{
        await changeProfileMenu();
        window.scrollTo(0, 0);
    }
    catch(err){
        console.log(err);
    } 
}



//SHOW CATEGORIES
function showCategories() {
    const categoriesList = document.querySelector('.categories-list');
    const arrow = document.querySelector('.view-categories-arrow');
    
    // Toggle the visibility of the categories list
    if (categoriesList.style.display === 'none' || categoriesList.style.display === '') {
        categoriesList.style.display = 'flex'; // Show the categories list
        arrow.classList.add('rotate'); // Rotate the arrow when the list is shown
    } else {
        categoriesList.style.display = 'none'; // Hide the categories list
        arrow.classList.remove('rotate'); // Remove the rotation when the list is hidden
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