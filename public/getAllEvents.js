
const events_container = document.getElementById("events_container");
const buttons=document.querySelectorAll('reg_btn');

let AllEvents = [];

async function getAllEvents() {
    let data;

    // console.log(localStorage.getItem('user'));

    const options = {
        method: 'GET', headers:{
            'Content-Type':'application/json',
        }
    }

    const responsesent = await fetch('/', options)
    .then((res) => {
        return res.json();
    })
    .then((res2) => {
        // console.log(res2.data.data);
        data = res2;
    })
    .catch(err => {
        console.log(err);
    });

    AllEvents = data.data.data;

    return data;
    // const return_data = await responsesent.json();
    // console.log("returned", return_data);
}


async function displayEvents() {
    let events = await getAllEvents();
    events = events.data.data;
    card =  ``

    for(let i = 0; i < events.length; i++) {
    card +=`    
    <div class="event_card">
        <h3>
            ${events[i].name}
        </h3>
        <p>
            Event Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum qui a dolore, doloribus, commodi itaque iusto porro ex deserunt libero fugiat dolor harum in asperiores, molestias eligendi. Est, dignissimos ipsam.
        </p>
        <div class="actions">
            <button class="reg_btn" id="${events[i]._id}">Register</button>
        </div>
    </div>`
    }

    
    events_container.innerHTML = card;
}

displayEvents();


function displayEvent(arr) {
    let events = arr;
    // events = events;
    card =  ``

    for(let i = 0; i < events.length; i++) {
    card +=`    
    <div class="event_card">
        <h3>
            ${events[i].name}
        </h3>
        <p>
            Event Description Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum qui a dolore, doloribus, commodi itaque iusto porro ex deserunt libero fugiat dolor harum in asperiores, molestias eligendi. Est, dignissimos ipsam.
        </p>
        <div class="actions">
            <button class="reg_btn" id="${events[i]._id}">Register</button>
        </div>
    </div>`
    }

    
    events_container.innerHTML = card;
}


const regEvent = document.getElementsByClassName('reg_btn');
const reg_action=document.getElementById

async function register(id) {
    

    // const id = document.getElementById('reg_event').value;
    console.log("oemcfhaweohm");

    const options = {
        method: 'POST', headers:{
            'Content-Type':'application/json',
            'user': '',
        }
    }
    const response = await fetch(`/events/${id}`, options)
    .then((res) => {
        return res.json();
    }).then((res2) => {
        console.log(res2);
        if(res2.mess=="You have been added")
        {
            document.getElementById(id).innerHTML="Registered";
        }
    }).catch(err => {
        console.log(err);
    }
    );
}


function search(keyword) {
    // const re = new RegExp(keyword, 'i');
    const filtered = AllEvents.filter((event) => {
        if(event.name.includes(keyword)) {
            return true;
        }
        else {
           return false;
        }
    });
    console.log(filtered); 
    displayEvent(filtered);

}

const search_bar = document.getElementById('search_btn');
search_bar.addEventListener('click', (e)=>{
    const keyword = document.getElementById('search_event').value;
    search(keyword);
});

events_container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('reg_btn')){
        // console.log(e.target.id);
        register(e.target.id);
    }
});
