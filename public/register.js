const loginButton = document.getElementById('Signup');

async function signup() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email);
    console.log(password);

    const options = {
        method: 'POST', headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({name, email, password})
    }
    const responsesent = await fetch('/register', options)
    .then((res) => {
        return res.json();
    }).then((res2) => {
        console.log(res2);
        data = res2;
        localStorage.setItem('user', data.mess);
    }).catch(err => {
        console.log(err);
        window.location.href = "http://localhost:3000/error.html";
        return true;
    });
    // console.log
    if(!data.error)
    {
        window.location.href = "http://localhost:3000/login.html";
        return true;
    }
    else {
        window.location.href = "http://localhost:3000/error.html";
        return true;
    }
}
loginButton.addEventListener('click', signup);