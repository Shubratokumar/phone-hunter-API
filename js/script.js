// accessing element by their Id
const phonesContainer = document.getElementById('phones-container');
const phoneContainer = document.getElementById('phone-container');
const error = document.getElementById('error');

// get input value and search result
const searchText = () => {
    const input = document.getElementById('input-field');
    const searchValue = input.value;
    // call function
    loadPhones(searchValue.toLowerCase());
    // clean input field
    input.value = "";
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
    // use slice method for showing only first 20 phones
    const newPhones = phones.slice(0, 20)
    const phonesContainer = document.getElementById('phones-container');
    // clean phones details
    phonesContainer.innerHTML = " ";
    // error handle : when searching input does't match
    if(newPhones.length == 0){
        error.innerText = "Oops! No phone found. Search only Iphone, Oppo, Huawei & Samsung Phones and Gadagets.";
        // clean specific phone details 
        phoneContainer.innerHTML = " ";
    }
    else{
        // use forEach for getting single phone
        newPhones?.forEach( phone => {
        // create div
        const div = document.createElement('div');
        // create class
        div.classList.add('phones-container')
        // add phones image , name & brand
        div.innerHTML = `
            <div class="card">
                <img src="${phone.image}" alt="">
                <div class="card-body">
                    <p>Phone Name : ${phone.phone_name}</p>
                    <p>Brand : ${phone.brand}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class ="btn btn-primary">More Info</button>
                </div>
            </div>
            `;
            phonesContainer.appendChild(div)
        });
        // clean error message
        error.innerText = "";
        // clean specific phone details 
        phoneContainer.innerHTML = " ";
    }
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
    const phoneContainer = document.getElementById('phone-container');
    // clean specific phone details
    phoneContainer.innerHTML = " ";
    // create div 
    const div = document.createElement('div');
    // add class
    div.classList.add('phones-container')
    // add specific phone details
    div.innerHTML = `
        <div class="card">
        <img src="${phone.image}" alt="">
            <div class="card-body">
                <h4>Phone details :</h4>
                <p>Phone Name : ${phone.name}</p>
                <p>Brand : ${phone.brand}</p>
                <p>Release date : ${phone.releaseDate ? phone.releaseDate : "No release date found."}</p>
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
                <p>WLAN : ${phone.others?.WLAN ? phone.others?.WLAN : "No WLAN." }</p>
                <p>Bluetooth : ${phone.others?.Bluetooth ? phone.others?.Bluetooth : "No Bluetooth."}</p>
                <p>GPS : ${phone.others?.GPS ? phone.others?.GPS : "No GPS."}</p>
                <p>NFC : ${phone.others?.NFC ? phone.others?.NFC : "No NFC."}</p>
                <p>Radio : ${phone.others?.Radio ? phone.others?.Radio : "No Radio."}</p>
                <p>USB : ${phone.others?.USB ? phone.others?.USB : "No USB."}</p>
            </div>
        </div>
    `;
    phoneContainer.appendChild(div);
}
/* ------------------------------------ Spinner script starts here ------------------------------ */
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(
        "#phones-container").style.visibility = "hidden";
        document.querySelector(
        "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
        "#loader").style.display = "none";
        document.querySelector(
        "#phones-container").style.visibility = "visible";
    }
};
/* ------------------------------------ Spinner script ends here -------------------------------- */

/* ----------------------------------------------- End ------------------------------------------ */