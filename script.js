const searchFood = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    if (searchText == '') {
        showError();
    }
    else {
        searchInput.value = '';

        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
    }
};

const displayPhone = (phones) => {
    const foodsContainer = document.getElementById('foods-container');
    if (phones.length == '') {
        showError();
    }
    else {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');

            div.innerHTML = `
            <div class="card h-100">
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
            foodsContainer.appendChild(div);
        })
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
        release = 'Not found';
    }
    else {
        release = `${phone.releaseDate}`
    }
    console.log(release);
    const detailsContainer = document.getElementById('phone-detail');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card mb-3 mx-auto w-100">
            <div class="row g-0">
                <div class="col-md-4">
                    <div class="d-flex justify-content-center align-items-center">
                        <img src="${phone.image}" class="w-75 pt-2" alt="...">
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="card-body">
                        <h4 class="card-title">${phone.name}</h4>
                        <small><strong>Release Date</strong> : ${release}</small>
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

                <div class="col-md-3">
                  <div class="card-header" style="margin-top: 77px">
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

    detailsContainer.appendChild(div);
}

const showError = () => {
    document.getElementById('empty-message').style.display = 'block';
}