// accessing element by Id
const phonesContainer = document.getElementById('phones-container');
const error = document.getElementById('error')

// get input value and search result
const searchText = () => {
    const input = document.getElementById('input-field');
    const searchValue = input.value;
    // console.log(searchValue);
    
    // error handle : when input is an empty string
    if(searchValue === ""){
        error.innerText = "Please enter a phone name!!!";
        
    }
    // error handle : when search with uppercase phone name
    else if( searchValue.toLowerCase() === "iphone" || searchValue.toLowerCase() === "oppo" || searchValue.toLowerCase() === "huawei" || searchValue.toLowerCase() === "samsung") {
        // call function
        loadPhones(searchValue);
    }
    else{
        
        error.innerText = "Sorry !!! We sell only Iphone, Oppo, Huawei & Samsung Phones and Gadagets."
        
    }
    // clean input field
    input.value = " ";
    // clean Phones container
        phonesContainer.innerHTML = " ";
    
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
        // console.log(phone);
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
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}
// display full specification of a phone
const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneContainer = document.getElementById('phone-container');
    // create div 
    const div = document.createElement('div');
    // add class
    div.classList.add('phones-container')
    div.innerHTML = `
        <div class="card">
        <img src="${phone.image}" alt="">
            <div class="card-body">
                <h4>Phone details :</h4>
                <p>Phone Name : ${phone.name}</p>
                <p>Brand : ${phone.brand}</p>
                <p>Release date : ${phone.releaseDate}</p>
            </div>
            <div class="card-body">
                <h4>Main Features :</h4>
                <p>Storage : ${phone.mainFeatures.storage}</p>
                <p>Display Size : ${phone.mainFeatures.displaySize}</p>
                <p>Chip Set : ${phone.mainFeatures.chipSet}</p>
                <p>Memory : ${phone.mainFeatures.memory}</p>
                <p>Sensonrs : ${phone.mainFeatures.sensors}</p>
            </div>
            <div class="card-body">
                <h4>Others Features :</h4>
                <p>WLAN : ${phone.others.WLAN}</p>
                <p>Bluetooth : ${phone.others.Bluetooth}</p>
                <p>GPS : ${phone.others.GPS}</p>
                <p>NFC : ${phone.others.NFC}</p>
                <p>Radio : ${phone.others.Radio}</p>
                <p>USB : ${phone.others.USB}</p>
            </div>
        </div>
    `;
    phoneContainer.appendChild(div);
}

