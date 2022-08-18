

async function getRegEvents() {
    let data;
    const uid = JSON.parse(localStorage.getItem('user'))._id;

    console.log(JSON.parse(localStorage.getItem('user')));

    const options = {
        method: 'GET', headers:{
            'Content-Type':'application/json',
        }
    }

    const responsesent = await fetch(`/events/${uid}`, options)
    .then((res) => {
        return res.json();
    })
    .then((res2) => {
        // console.log(res2);
        data = res2;
    })
    .catch(err => {
        console.log(err);
    });

    return data;
    // const return_data = await responsesent.json();
    // console.log("returned", return_data);
}


async function displayEvents() {
    let events = await getRegEvents();
    console.log(events);
    events = events.data;
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
            <button class="reg_btn" id="${events[i]._id}">Deregister</button>
        </div>
    </div>`
    }

    
    events_container.innerHTML = card;
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
    

    displayEvents();
}



const events_container = document.getElementById("events_container");
events_container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('reg_btn')){
        // console.log(e.target.id);
        deregister(e.target.id);
    }
});