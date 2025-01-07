const url = "http://localhost:3000/cars";

window.addEventListener('load', fetchData);

function fetchData() {
    fetch(url)
      .then((result) => result.json())
      .then((cars) => {
        if (cars.length > 0) {
          let html = `<ul class="row g-3 justify-content-center">`;
          cars.forEach((car) => {
            const translatedBGColor = translate(car.color, 0.4);
            const translatedColor = translate(car.color, 0.9);
            const translatedBorderColor = translate(car.color, 0.6);
            html += `
          <li
            class="col-md-3 p-3 rounded border border-secondary d-flex flex-column justify-content-between"
            style="background-color: ${translatedBGColor}; color: ${translatedColor};">
            <h3>${car.brand} ${car.type}</h3>
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
                onclick="deleteCar(${car.id})">
                Ta bort
              </button>
            </div>
          </li>`;
          });
          html += `</ul>`;
  
          const listContainer = document.getElementById('listContainer');
          listContainer.insertAdjacentHTML('beforeend', html);
        }
      });
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