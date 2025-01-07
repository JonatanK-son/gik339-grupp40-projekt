const url = "http://localhost:3000/cars";

window.addEventListener('load', fetchData);

function fetchData() {
    fetch(url)
      .then((result) => result.json())
      .then((cars) => {
        if (cars.length > 0) {
          let html = `<ul class="row g-3 justify-content-center">`;
          cars.forEach((car) => {
            html += `
          <li
            class="col-md-3 bg-light text-dark p-3 rounded border border-secondary d-flex flex-column justify-content-between">
            <h3>${car.brand} ${car.type}</h3>
            <p>${car.fuel}</p>
            <div>
              <button
                class="btn btn-outline-secondary btn-sm mt-2" onclick="setCurrentUser(${car.id})">
                Ändra
              </button>
              <button class="btn btn-outline-secondary btn-sm mt-2" onclick="deleteUser(${car.id})">
                Ta bort
              </button>
            </div>
          </li>`;
          });
          html += `</ul>`;
  
          const listContainer = document.getElementById('listContainer');
          listContainer.innerHTML = '';
          listContainer.insertAdjacentHTML('beforeend', html);
        }
      });
  }