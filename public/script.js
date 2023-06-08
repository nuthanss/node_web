

const AddContact = () => {
    let fname = document.getElementById('firstname').value;
    let lname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let city = document.getElementById('city').value;
    let phone = document.getElementById('phone').value;

    

    fetch('http://localhost:5001/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FirstName: fname,
            LastName: lname,
            Email: email,
            City: city,
            Phone: phone
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data);
             alert('Contact Added Successfully !');
        }).catch(err => {
            alert('Something went wrong !');
        })
}

const DisplayContacts = () => {
    fetch('http://localhost:5001/contacts')
        .then(res => res.json())
        .then(data => {
            let contacts = '';
            data.map(item => {
                contacts += `<div class="col-md-3">
                    <div class="card mb-2">
                    <div class="card-body">
                      <h5 class="card-title">${item.FirstName} ${item.LastName} 
                      <i onclick="DeleteContact(${item.id})" class="fas fa-times fa-lg float-end text-danger"></i> 
                      <i onclick="GetContactById(${item.id})" class="fas fa-pencil-alt fa-lg px-2 float-end text-primary"></i></h5>
                      <p class="card-text">${item.Email}</p>
                      <p class="card-text">${item.City}</p>
                      <p class="card-text">${item.Phone}</p>                      
                    </div>
                  </div>
                </div>`;
                document.getElementById('contacts').innerHTML = contacts;
            });
        });
}

const DeleteContact = (id) => {
    fetch(`http://localhost:5001/contacts/${id}`, {
        method: 'DELETE'
    });
}

let contactId = '';
const GetContactById = (id) => {
    fetch(`http://localhost:5001/contacts/${id}`)
        .then(res => res.json())
        .then(data => {
            contactId = data.id;
            document.getElementById('firstname').value = data.FirstName;
            document.getElementById('lastname').value = data.LastName;
            document.getElementById('email').value = data.Email;
            document.getElementById('phone').value = data.Phone;
            document.getElementById('city').value = data.City;
        })
}


const UpdateContact = () => {
    fetch(`http://localhost:5001/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            FirstName: document.getElementById('firstname').value,
            LastName: document.getElementById('lastname').value,
            Email: document.getElementById('email').value,
            City: document.getElementById('city').value,
            Phone: document.getElementById('phone').value
        })
    });
}

DisplayContacts();

