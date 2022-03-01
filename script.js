const toggleSpinner = (style) => {
    document.getElementById('spinner').style.display = style;
}

const searchPhones = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    if (searchText == '') {
        showErrorMessage('Empty filed, Please Search a food');
        toggleSpinner('none');
    }
    else {
        toggleSpinner('block')
        searchInput.value = '';

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
    }
};

const displayPhone = (phones) => {
    const phonesContainer = document.getElementById('foods-container');
    phonesContainer.textContent = "";
    if (phones.length == '') {
        showErrorMessage("Product did't found, try again");
        toggleSpinner('none');
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');

            div.innerHTML = `
            <div id="phone" class="card h-100">
                <img src="${phone.image}" class="w-50 mx-auto pt-3" alt="...">
                <div class="card-body row align-item-center justify-content-center">
                    <div class="col-7">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                    </div>
                    <div class="col-5">
                        <button onclick="showDetails('${phone.slug}')" class="btn btn-primary px-4 py-2">Details</button>
                    </div>
                </div>
            </div>
            `;
            phonesContainer.appendChild(div);
        });
        toggleSpinner('none')
    }
}

const showDetails = (productId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${productId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}


const displayDetails = (phone) => {

    let release;
    if (phone.releaseDate == "") {
        release = 'date not found';
    }
    else {
        release = `${phone.releaseDate}`
    }

    const phoneDetailsContainer = document.getElementById('phone-detail');
    phoneDetailsContainer.textContent = "";
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card mb-3 mx-auto w-100">
            <div class="row g-0">
                <div class="col-md-4">
                    <div class="d-flex justify-content-center align-items-center">
                        <img src="${phone.image}" class="w-75 pt-2" alt="...">
                    </div>
                    <div class="d-flex justify-content-center align-items-center my-3">
                        <div>
                            <h2 class="card-title fw-bold">${phone.name}</h2>
                            <small><strong>Released</strong> : ${release}</small>
                        </div>
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
                            <li class="list-group-item"><strong>WLAN</strong>: ${phone.others.WLAN}</li>
                            <li class="list-group-item"><strong>Bluetooth</strong>: ${phone.others.Bluetooth}</li>
                            <li class="list-group-item"><strong>GPS</strong>: ${phone.others.GPS}</li>
                            <li class="list-group-item"><strong>USB</strong>: ${phone.others.USB}</li>
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
}

const showErrorMessage = (message) => {
    document.getElementById('message').style.display = 'block';
    document.getElementById('Error-message').innerText = message;
}