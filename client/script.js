const url = "http://localhost:3000/cars";

window.addEventListener('load', fetchData);

function fetchData() {
    fetch(url)
      .then((result) => result.json())
      .then((cars) => {
        if (cars.length > 0) {
          let html = `<ul class="row gap-3 justify-content-center">`;
          cars.forEach((car) => {
            const translatedBGColor = translate(car.color, 0.4);
            const translatedColor = translate(car.color, 0.9);
            const translatedBorderColor = translate(car.color, 0.6);
            html += `
          <li
            class="col-md-3 p-3 rounded border border-secondary d-flex flex-column justify-content-between"
            style="background-color: ${translatedBGColor}; color: ${translatedColor};">
            <h3>${car.brand} ${car.type}</h3>
            <p>${car.fuel}</p>
            <div>
              <button
                class="btn btn-outline-secondary btn-sm mt-2" 
                style="border-color: ${translatedBorderColor}; background-color: rgba(255, 255, 255, 0.5); color: ${translatedColor};"
                onclick="setCurrentCar(${car.id})">
                Ändra
              </button>
              <button 
                class="btn btn-outline-secondary btn-sm mt-2" 
                style="border-color: ${translatedBorderColor}; background-color: rgba(255, 255, 255, 0.5); color: ${translatedColor};"
                onclick="deleteCar(${car.id})"
                data-bs-toggle="modal"
                data-bs-target="#myModal">
                Ta bort
              </button>
            </div>
          </li>`;
          });
          html += `</ul>`;
  
          const listContainer = document.getElementById('listContainer');
          listContainer.innerHTML = "";
          listContainer.insertAdjacentHTML('beforeend', html);
        }
      });
}

function deleteCar(id) {
  console.log("delete", id);
  fetch(`${url}/${id}`, {method: "DELETE"})
  .then((result) => fetchData());

  html = `<p>Bilen togs bort</p>`
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = html;
}

function setCurrentCar(id) {
  fetch(`${url}/${id}`)
  .then(result => result.json())
  .then(car => {
    carForm.brand.value = car.brand;
    carForm.type.value = car.type;
    carForm.fuel.value = car.fuel;
    carForm.color.value = car.color;

    localStorage.setItem(`currentId`, car.id)
  });
}

carForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault();
  console.log(e);
  const serverCarObject = {
    brand: "",
    type: "",
    fuel: "",
    color: ""
  };
  serverCarObject.brand = carForm.brand.value; //kan sättas i loop
  serverCarObject.type = carForm.type.value;
  serverCarObject.fuel = carForm.fuel.value;
  serverCarObject.color = carForm.color.value;

  const id = localStorage.getItem("currentId");
  if(id) {
    serverCarObject.id = id;
  }
  const request = new Request(url, {
    method: serverCarObject.id ? "PUT" : "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(serverCarObject)
  });

  fetch(request).then((response) => {
    fetchData();
    localStorage.removeItem("currentId");
    carForm.reset();
  })

  if(serverCarObject.id) {
    html = `<p>Bilen uppdaterades</p>`;
  }
  else {
    html = `<p>Bilen lades till</p>`;
  }

  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = html;
}

function translate(text, opacity) {
    const lowerCaseText = text.toLowerCase()
    const color = translations[lowerCaseText];
      return `rgba(${color}, ${opacity})`;
}

const translations = {
    "röd": "255, 0, 0",
    "blå": "0, 0, 255",
    "grön": "0, 128, 0",
    "gul": "255, 255, 0",
    "svart": "0, 0, 0",
    "silver": "192, 192, 192",
    "grå": "128,128,128",
    "vit": "255, 255, 255",
    "lila": "128,0,128",
    "mörkblå": "0,0,128",
    "turkos": "0,128,128",
    "ljusblå": "0,255,255",
    "rosa": "255,192,203",
    "brun": "165,42,42",
    "guld": "255,215,0",
    "orange": "255,165,0",
  };