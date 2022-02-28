// get input value and search result
const searchText = () => {
    const input = document.getElementById('input-field');
    const searchValue = input.value;
    // console.log(searchValue);
    // clean input field
    input.value = " ";
    // call function
    loadPhones(searchValue);
}
// load Phones
const loadPhones = searchValue =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhones(data.data))
}
// display phones by search results
const displayPhones = phones => {
    // console.log(phones);
    const newPhones = phones.slice(0, 20)
    // console.log(newPhones)
    const phonesContainer = document.getElementById('phones-container');
    // use forEach for getting single phone
    newPhones.forEach( phone => {
        console.log(phone);
        // create div
        const div = document.createElement('div');
        // create class
        div.classList.add('phones-container')
        // add phone image , name & brand
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" alt="">
            <div class="card-body">
                <p>Phone Name : ${phone.phone_name}</p>
                <p>Brand : ${phone.brand}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class ="btn btn-primary" >More Info</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div)
    })
    // phonesContainer.innerHTML = "";
}
// Load Phone Details
const loadPhoneDetails = id => {
    console.log(id);
}

