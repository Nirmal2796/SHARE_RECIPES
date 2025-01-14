register_name = document.getElementById('register_name');
register_email = document.getElementById('register_email');
register_password = document.getElementById('register_password');
register_form_msg = document.getElementById('register_form_msg');
// register_name_error = document.getElementById('register_name_error');

login_email = document.getElementById('login_email');
login_password = document.getElementById('login_password');
login_msg = document.getElementById('login_msg');
// login_error = document.getElementById('login_error');

register_form = document.getElementById('register_form');
login_form = document.getElementById('login_form');

// sign_up_submit = document.getElementById('sign_up_submit');
// login_submit = document.getElementById('login_submit');

register_form.addEventListener('submit', onSignUp);
login_form.addEventListener('submit', onLogin);



function ShowRegister() {
    document.getElementById('register_div').hidden = false;
    document.getElementById('login_div').hidden = true;
}

function ShowLogin() {
    document.getElementById('login_div').hidden = false;
    document.getElementById('register_div').hidden = true;
}


async function onSignUp(e) {

    e.preventDefault();

    if (register_name.value == '' || register_email.value == '' ||  register_password == '') {
        register_form_msg.innerHTML = '<b>Please enter all fields</b>';

        setTimeout(() => {
            register_form_msg.removeChild(register_form_msg.firstChild);
        }, 2000);
    }
    else {

        try {

            User = {
                name: register_name.value,
                email: register_email.value,
                password: register_password.value
            };

            const result = await axios.post("http://localhost:3000/signup", User);

            alert(result.data.message);

            register_form.reset();
        }
        catch (err) {

            register_form.reset();

            register_form_msg.innerHTML = `${err.response.data}`;
            setTimeout(() => {
                register_form_msg.removeChild(register_form_msg.firstChild);
            }, 2000);

            console.log(err);
        }
    }

}

async function onLogin(e) {

    e.preventDefault();

    if (login_email.value == '' || login_password == '') {
        login_msg.innerHTML = '<b>Please enter all fields</b>';

        setTimeout(() => {
            login_msg.removeChild(register_form_msg.firstChild);
        }, 2000);
    }
    else {

        try {

            User = {
                name: register_name.value,
                email: login_email.value,
                password: login_password.value
            };

            //window.location.search will return ?redirect='';
            //new URLSearchParams() This takes the query string and turns it into an object-like structure that lets you easily work with the parameters.
            //Once you create a URLSearchParams object, you can:
            // Get specific parameter values.
            // Add or remove parameters.
            // Iterate over all the parameters.            
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect');


            // console.log(redirect);

            const result = await axios.post(`http://localhost:3000/login`, User);

            console.log(result);
            
            login_form.reset();

            alert(result.data.message);


            window.location.href = '../receipe/receipe.html';

            localStorage.setItem('token', result.data.token);

            
            // if (redirect) {
            //     // window.location.href=redirect;
                
            // } else {
            //     // Default fallback
                window.location.href = '../home/home.html';
            // }

        }
        catch (err) {

            login_form.reset();
        

            login_msg.innerHTML = `${err.response.data.message}`;
            setTimeout(() => {
                login_msg.removeChild(login_msg.firstChild);
            }, 2000);
        

            console.log(err);
        }
    }
}