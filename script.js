const searchFood = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 20)))
};

const displayPhone = (phones) => {
    const foodsContainer = document.getElementById('foods-container');
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

const showDetails = (productId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${productId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}


const displayDetails = (phone) => {
    console.log(phone);
    const detailsContainer = document.getElementById('phone-detail');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="card mb-3 mx-auto" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${phone.name}</h5>
                        <div class="card-header">
                            Featured
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">An item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    detailsContainer.appendChild(div);
}