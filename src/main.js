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
}


const initializeApp = () => {
    connectHTMLElems();
    setupListeners();
}

const onEnterSubmit = () => {};
const onClickSubmit = () => {};

document.addEventListener('DOMContentLoaded', initializeApp)