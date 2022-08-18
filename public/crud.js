
const create_btn = document.getElementsByName('create_eve_btn')[0];
// const modify_btn = document.getElementsByName('modify_eve_btn')[0];
const event_container = document.getElementById('event_container');




async function createEvent() {

    const form = document.forms['create_event'];
    // console.log(form['name'].value);

    const name = form['name'].value;
    const max_slots = form['max_no'].value;
    const event_type = form['Type'].value;
    const start_date = form['date_start'].value+form['time_start'].value;
    const end_date = form['date_stop'].value+form['time_stop'].value;
    const location = [form['lat'].value, form['lon'].value];


    const options = {
        method: 'GET', headers:{
            'Content-Type':'application/json',
            body: JSON.stringify({name, max_slots, event_type, start_date, end_date, location}),
        }
    }

    const responsesent = await fetch('/event/create', options)
    .then((res) => {
        return res.json();
    })
    .then((res2) => {
        console.log(res2);
        data = res2;
    })
    .catch(err => {
        console.log(err);
    });
}

async function modifyEvent() {

    const form = document.forms['create_event'];
    // console.log(form['name'].value);

    const name = form['name'].value;
    const max_slots = form['max_no'].value;
    const event_type = form['Type'].value;
    const start_date = form['date_start'].value+form['time_start'].value;
    const end_date = form['date_stop'].value+form['time_stop'].value;
    const location = [form['lat'].value, form['lon'].value];


    const options = {
        method: 'GET', headers:{
            'Content-Type':'application/json',
            body: JSON.stringify({name, max_slots, event_type, start_date, end_date, location}),
        }
    }

    const responsesent = await fetch('/event/create', options)
    .then((res) => {
        return res.json();
    })
    .then((res2) => {
        console.log(res2);
        data = res2;
    })
    .catch(err => {
        console.log(err);
    });
}


async function deleteEvent() {

}

create_btn.addEventListener('click', createEvent);
// modify_btn.addEventListener('click', modifyEvent);
// delete_btn.addEventListener('click', deleteEvent);



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
            <button class="reg_btn" id="${events[i]._id}">Delete</button>
        </div>
    </div>`
    }

    
    event_container.innerHTML = card;
    // console.log(event_container);
}

displayEvents();

async function deregister(id) {
    

    // const id = document.getElementById('reg_event').value;
    console.log("oemcfhaweohm");
    console.log(id);

    const options = {
        method: 'DELETE', headers:{
            'Content-Type':'application/json',
        }
    }
    const response = await fetch(`/events/delete/${id}`, options)
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
    

    displayEvents();
}


event_container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('reg_btn')){
        // console.log(e.target.id);
        deregister(e.target.id);
    }
});