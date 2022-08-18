const loginButton = document.getElementById('LoginButton');

async function login() {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email);
    console.log(password);

    const options = {
        method: 'POST', headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({email, password})
    }
    const responsesent = await fetch('/login', options)
    .then((res) => {
        return res.json();
    }).then((res2) => {
        // console.log(res2);
        data = res2;
        localStorage.setItem('user', JSON.stringify(data.mess));
    }).catch(err => {
        alert("Please Enter Valid Credentials");
    });
    
    // console.log(data.mess.role);
    if(data.mess.role == "user")
    {
        window.location.href = "http://localhost:3000/home.html";
        return true;
    }
    else if(data.mess.role=="admin")
    {
        window.location.href = "http://localhost:3000/admin.html";
        return true;
    }
    else {
        return false;
    }
}
loginButton.addEventListener('click', login);