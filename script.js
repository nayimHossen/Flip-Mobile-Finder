
// search phones from api function
const searchPhones = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    //empty input filed error handle
    if (searchText == '') {
        showErrorMessage('block', 'Empty filed, Please Search a food');
        toggleSpinner('none');
    }
    else {
        toggleSpinner('block')
        searchInput.value = '';

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            //show first 20 phone using slice method
            .then(data => displayPhone(data.data.slice(0, 20)))
    }
};

//display get data from api function
const displayPhone = (phones) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = "";

    //if did't have product that you search show this message
    if (phones.length == '') {
        showErrorMessage("block", "Product did't found, try again");
        toggleSpinner('none');
    }
    else {
        //to get each phone using forEach method
        phones.forEach(phone => {
            //destructuring
            const { image, brand, phone_name, slug } = phone;

            const div = document.createElement('div');
            div.classList.add('col');

            //each phone card that display img, name, and details button
            div.innerHTML = `
            <div id="phone" class="card h-100 shadow-sm">
                <img src="${image}" class="w-50 mx-auto pt-3" alt="...">
                <div class="card-body row align-item-center justify-content-center">
                    <div class="col-7">
                        <h5 class="card-title">${phone_name}</h5>
                        <p class="card-text">${brand}</p>
                    </div>
                    <div class="col-5">
                        <button onclick="loadShowDetails('${slug}')" class="btn searchButton px-4 py-2">Details</button>
                    </div>
                </div>
            </div>
            `;
            phonesContainer.appendChild(div);
        });
        toggleSpinner('none')
        showErrorMessage('none', "");
    }
};

//show detail calling api using phone name and dynamic parameter
const loadShowDetails = (productId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${productId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
};

//display get details data from api in website
const displayDetails = (phone) => {
    const phoneDetailsContainer = document.getElementById('phone-detail');
    phoneDetailsContainer.textContent = "";

    //details information show in a bootstrap card 3 column
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card mb-3 mx-auto w-100">
            <div class="row g-0">

                <div class="col-md-4">
                    <div class="d-flex justify-content-center align-items-center my-3">
                        <div>
                            <h2 class="card-title fw-bold">${phone.name}</h2>
                            <small><strong>Released</strong> : ${phone.releaseDate == "" ? 'date not found' : phone.releaseDate}</small>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <img src="${phone.image}" class="w-75 pt-2" alt="...">
                    </div>
                </div>

                <div class="col-md-5">
                    <div class="card-body">
                        <div class="card-header">
                            Featured
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Brand</strong> : ${phone.brand}</li>
                            <li class="list-group-item"><strong>Storage</strong>: ${phone.mainFeatures.storage}</li>
                            <li class="list-group-item"><strong>Memory</strong>: ${phone.mainFeatures.memory}</li>
                            <li class="list-group-item"><strong>Display Size</strong>: ${phone.mainFeatures.displaySize}</li>
                            <li class="list-group-item"><strong>WLAN</strong>: ${phone.others?.WLAN || "didn't found"}</li>
                            <li class="list-group-item"><strong>Bluetooth</strong>: ${phone.others?.Bluetooth || "didn't found"}</li>
                            <li class="list-group-item"><strong>GPS</strong>: ${phone.others?.GPS || "didn't found"}</li>
                            <li class="list-group-item"><strong>USB</strong>: ${phone.others?.USB || "didn't found"}</li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-3 mt-3">
                  <div class="card-header">
                            Sensor
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${phone.mainFeatures.sensors[0]}</li>
                            <li class="list-group-item">${phone.mainFeatures.sensors[1]}</li>
                            <li class="list-group-item">${phone.mainFeatures.sensors[2]}</li>
                            <li class="list-group-item">${phone.mainFeatures.sensors[3]}</li>
                            <li class="list-group-item">${phone.mainFeatures.sensors[4]}</li>
                            <li class="list-group-item">${phone.mainFeatures.sensors[5]}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    phoneDetailsContainer.appendChild(div);
};

//show error message function
const showErrorMessage = (displayStyle, message) => {
    document.getElementById('message').style.display = displayStyle;
    document.getElementById('Error-message').innerText = message;
};

//spinner toggle function
const toggleSpinner = (style) => {
    document.getElementById('spinner').style.display = style;
}
