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
            console.log(data);
            switchView();
            fadeInOut();
        });
    }
};

const onClickSubmit = () => {
        let query = viewElements.searchInput.value;
        getWeatherByCity(query).then(data => {
            console.log(data);
            switchView();
        });
};

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