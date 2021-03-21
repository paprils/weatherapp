import { getWeatherByCity } from './apiService.js';
import { mapListToDOMElements } from './DOMActions.js';

class WeatherApp {
    constructor() {
        this.viewElements = {}
        this.initializeApp();
    }

    initializeApp = () => {
        this.connectDOMElements();
        this.setupListeners();
    }

connectDOMElements = () => {
    const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
    this.viewElements = mapListToDOMElements(listOfIds);
}

setupListeners = () => {
    this.viewElements.searchInput.addEventListener('keydown', this.handleSubmit);
    this.viewElements.searchButton.addEventListener('click', this.handleSubmit);
    this.viewElements.returnToSearchBtn.addEventListener('click', this.returnToSearch);
    }

handleSubmit = () => {
    if (event.type === 'click' || event.key === 'Enter') {
        this.fadeInOut();
        let query = this.viewElements.searchInput.value;
        getWeatherByCity(query).then(data => {
            this.displayWeatherData(data);
        });
    }
}


fadeInOut = () => {
    if (this.viewElements.mainContainer.style.opacity === '1' || this.viewElements.mainContainer.style.opacity === '') {
        this.viewElements.mainContainer.style.opacity = '0';
    } else {
        this.viewElements.mainContainer.style.opacity = '1';
    }
}

switchView = () => {
    if (this.viewElements.weatherSearchView.style.display !== 'none') {
        this.viewElements.weatherSearchView.style.display = 'none';
        this.viewElements.weatherForecastView.style.display = 'block'; 
    } else {
        this.viewElements.weatherForecastView.style.display = 'none';
        this.viewElements.weatherSearchView.style.display = 'flex';
    }
}

returnToSearch = () => {
    this.fadeInOut()

    setTimeout(() => {
        this.switchView();
        this.fadeInOut()
    }, 500);
}

displayWeatherData = data => {
    this.switchView();
    this.fadeInOut();
    
    const weather = data.consolidated_weather[0];
  
    this.viewElements.weatherCity.innerText = data.title;
    this.viewElements.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    this.viewElements.weatherIcon.alt = weather.weather_state_name;
    this.viewElements.weatherIcon.style.height = "250px";
    this.viewElements.weatherIcon.style.width = "auto";

    const currTemp = weather.the_temp.toFixed(2);
    const maxTemp = weather.max_temp.toFixed(2);
    const minTemp = weather.min_temp.toFixed(2);

    this.viewElements.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}°C`
    this.viewElements.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}°C`
    this. viewElements.weatherMinTemp.innerText = `Min temperature: ${minTemp}°C`
    }
}

document.addEventListener('DOMContentLoaded', new WeatherApp());