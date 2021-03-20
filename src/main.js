import { getWeatherByCity } from './apiService.js';
const viewElements = {};

const getDOMElem = id => {
    return document.getElementById(id);
}

const connectHTMLElems = () => {
    viewElements.mainContainer = getDOMElem('mainContainer');
    viewElements.weatherSearchView = getDOMElem('weatherSearchView');
    viewElements.weatherForecastView = getDOMElem('weatherForecastView');

    viewElements.searchInput = getDOMElem('searchInput');
    viewElements.searchButton = getDOMElem('searchButton');
    viewElements.weatherCityContainer = getDOMElem('weatherCityContainer');

    viewElements.weatherCity = getDOMElem('weatherCity');
    viewElements.weatherIcon = getDOMElem('weatherIcon');

    viewElements.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
    viewElements.weatherMaxTemp = getDOMElem('weatherMaxTemp');
    viewElements.weatherMinTemp = getDOMElem('weatherMinTemp');

    viewElements.returnToSearchBtn = getDOMElem('returnToSearchBtn');
}

const setupListeners = () => {
    viewElements.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElements.searchButton.addEventListener('click', onClickSubmit);
    viewElements.returnToSearchBtn.addEventListener('click', returnToSearch);
}


const initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = event => {
    if (event.key === 'Enter') {
        fadeInOut();
        let query = viewElements.searchInput.value;
        getWeatherByCity(query).then(data => {
            displayWeatherData(data);

        });
    }
};

const onClickSubmit = () => {
        fadeInOut();
        let query = viewElements.searchInput.value;
        getWeatherByCity(query).then(data => {
            displayWeatherData(data);
        });
};

const displayWeatherData = data => {
    switchView();
    fadeInOut();
    
    const weather = data.consolidated_weather[0];
  
    viewElements.weatherCity.innerText = data.title;
    viewElements.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    viewElements.weatherIcon.alt = weather.weather_state_name;
    viewElements.weatherIcon.style.height = "250px";
    viewElements.weatherIcon.style.width = "auto";

    const currTemp = weather.the_temp.toFixed(2);
    const maxTemp = weather.max_temp.toFixed(2);
    const minTemp = weather.min_temp.toFixed(2);

    viewElements.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}°C`
    viewElements.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}°C`
    viewElements.weatherMinTemp.innerText = `Min temperature: ${minTemp}°C`
}

const fadeInOut = () => {
    if (viewElements.mainContainer.style.opacity === '1' || viewElements.mainContainer.style.opacity === '') {
        viewElements.mainContainer.style.opacity = '0';
    } else {
        viewElements.mainContainer.style.opacity = '1';
    }
}



const switchView = () => {
    if (viewElements.weatherSearchView.style.display !== 'none') {
        viewElements.weatherSearchView.style.display = 'none';
        viewElements.weatherForecastView.style.display = 'block'; 
    } else {
        viewElements.weatherForecastView.style.display = 'none';
        viewElements.weatherSearchView.style.display = 'flex';
    }
}

const returnToSearch = () => {
    fadeInOut()

    setTimeout(() => {
        switchView();
        fadeInOut()
    }, 500);
}



document.addEventListener('DOMContentLoaded', initializeApp)