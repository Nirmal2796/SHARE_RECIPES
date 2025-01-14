const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const edit_profile_form = document.getElementById('edit-profile-form');

edit_profile_form.addEventListener('submit', editProfile);



//DOM CONTENT LOAD EVENT
document.addEventListener('DOMContentLoaded', DomLoad);


//DOM CONTENT LOADED
async function DomLoad() {
    try {
        // console.log('Dom Loaded');
        await changeProfileMenu();
        window.scrollTo(0, 0);

        await getUserDetails();

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




async function editProfile(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {

        user = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        const res = await axios.post('http://localhost:3000/edit-profile', user, { headers: { 'Auth': token } });
    }
    catch (err) {
        console.log(err);
    }
}


async function getUserDetails() {

    const token = localStorage.getItem('token');

    try {
        const res = await axios.get('http://localhost:3000/get-user', { headers: { 'Auth': token } });

        username.value=res.data.user.name;
        email.value=res.data.user.email;

    }
    catch (err) {
        console.log(err);
    }

}