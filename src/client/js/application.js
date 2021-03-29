// api documentation websites
// forecastURI: https://www.weatherbit.io/api/weather-forecast-16-day
// currentWeatherURI: https://www.weatherbit.io/api/weather-current
// inconInclude: https://www.weatherbit.io/support/post/icons

// define variables
const geoNamesData = {};
const serverURL = "http://127.0.0.1:8081";

// const icon = "https://www.weatherbit.io/static/img/icons/r01d.png";

// get day difference between two dates
const dateDiffInDays = (laterDate) => {
    const firstDate = new Date(new Date().toISOString().slice(0, 10)),
        secondDate = new Date(laterDate);
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    const utc2 = Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}


// set the min attribute in date picker
const greyPastDate = e => {
    const currentDate = new Date().toISOString().slice(0, 10);
    document.getElementById("date").setAttribute("min", `${currentDate}`);
    document.getElementById("date").setAttribute("placeholder", `${currentDate}`);
};

const isValidFormInput = event => {
    const formInput = {
        cityName: "Lagos",
        departureDate: new Date(new Date().toISOString().slice(0, 10)),
    };

    const formEl = event.currentTarget.querySelectorAll("input");
    if (/^[a-zA-Z_ ]*$/g.test(formEl[0].value)) {
        formInput["cityName"] = formEl[0].value;
    } else {
        alert("Enter valid city name!");
        stopAllExecution();
    };

    if (formEl[1].value) {
        formInput["departureDate"] = formEl[1].value;
    };

    if ((formEl[2].value) && ((formEl[2].value) < (formEl[1].value))) {
        alert("return date is earler than departure date")
        stopAllExectution()
    } else if (formEl[2].value) {
        geoNamesData["returnDate"] = formEl[2].value;
    };
    return formInput;
}
// for fetching data from geonames
const getCountryData = async event => {
    event.preventDefault();
    const formInput = isValidFormInput(event);
    const cityName = formInput["cityName"];
    const departureDate = formInput["departureDate"];
    const days2departure = dateDiffInDays(departureDate);
    const apiURI = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=10&fuzzy=0&username=koakande`;
    const geoNamesStream = await fetch(apiURI);
    try {
        const geoNamesObj = await geoNamesStream.json();
        geoNamesData["City"] = geoNamesObj["geonames"][0]["toponymName"];
        geoNamesData["Country"] = geoNamesObj["geonames"][0]["countryName"];
        geoNamesData["Latitude"] = geoNamesObj["geonames"][0]["lat"];
        geoNamesData["Longitude"] = geoNamesObj["geonames"][0]["lng"];
        geoNamesData["departureDate"] = departureDate;
        geoNamesData["daysToDeparture"] = days2departure;

        // displayInfo(geoNamesData);
        gePixaBayImg(geoNamesData);
        getWeatherBitData(geoNamesData);
        setTimeout(() => { displayInfo(geoNamesData) }, 1000);
        return geoNamesData;
    } catch (error) {
        console.log(`error: ${error}`);
    }
};

// get image from pixaBay
const gePixaBayImg = async geoNamesData => {
    const pixCityName = geoNamesData["City"];
    const pixBayAPI = "20843692-350cf2ac1c16bbb7ec469b3f2";
    const pixBayURL = `https://pixabay.com/api/?key=${pixBayAPI}&q=${pixCityName}`;
    const pixBayStream = await fetch(pixBayURL);

    try {
        const pixBayData = await pixBayStream.json();
        const cityImgLink = pixBayData["hits"][0]["largeImageURL"];//largeImageURLwebformatURL
        geoNamesData["CityImg"] = cityImgLink;
        return cityImgLink;
    } catch (error) {
        console.log(`error:${error}`);
    }
}

// get weather data (temp and comment) from weathherBit
const getWeatherBitData = async geoData => {
    const lat = await geoData["Latitude"];
    const lon = await geoData["Longitude"];
    const APIKey = "c9a6210e642f49a5bd6ac94ddfd5d958";

    if (geoData["daysToDeparture"] > 7) {
        const weatherbitBase = `https://api.weatherbit.io/v2.0/forecast/daily?`;
        const weatherbitFull = `${weatherbitBase}&lat=${lat}&lon=${lon}&key=${APIKey}`;
        const weatherbitData = await fetch(weatherbitFull);

        try {
            const bitData = await weatherbitData.json();
            geoData["high_temp"] = bitData["data"][0]["high_temp"];
            geoData["low_temp"] = bitData["data"][0]["low_temp"];
            geoData["description"] = bitData["data"][0]["weather"]["description"];
        } catch (error) {
            console.log(`error: ${error}`)
        }

    } else {
        const weatherbitBase = `https://api.weatherbit.io/v2.0/current?`;
        const weatherbitFull = `${weatherbitBase}&lat=${lat}&lon=${lon}&key=${APIKey}`;
        const weatherbitData = await fetch(weatherbitFull);

        try {
            const bitData = await weatherbitData.json();
            geoData["temp"] = bitData["data"][0]["temp"];
            geoData["description"] = bitData["data"][0]["weather"]["description"];
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
};


// send retrieve data to backend
const postData = async serverData => {
    const resultPromise = await fetch(`${serverURL}/postData`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "data": serverData })
    })

    try {
        const result = await resultPromise.json();
        return result

    } catch (error) {
        console.log(`posting data to backend failed with error: ${error}`);
    }
};

// retrieve from backend and display
const getData = async () => {
    const weatherData = await fetch(`${serverURL}/getData`);
    try {
        const data = await weatherData.json();
        // setTimeout(() => { displayInfo(data) }, 1000);
    } catch (error) {
        console.log(`data retrieval from backend failed with error : ${error}`)
    }
}

// display the retrieved data from geonames
const displayInfo = retrievedData => {
    document.getElementById("destination").innerText = `My trip to: ${retrievedData["City"]}, ${retrievedData["Country"]}`;
    document.getElementById("departure-day").innerText = `Departing: ${retrievedData["departureDate"]}`;
    document.getElementById("days-away").innerText = `${retrievedData["City"]}, ${retrievedData["Country"]} is ${retrievedData["daysToDeparture"]} days away`;
    if (retrievedData["daysToDeparture"] > 7) {
        document.getElementById("temp").innerHTML = `High - ${retrievedData["high_temp"]} &#8451, Low - ${retrievedData["low_temp"]} &#8451`;
    } else {
        document.getElementById("temp").innerHTML = `${retrievedData["temp"]} &#8451`;
    };
    document.getElementById("comment").innerText = `${retrievedData["description"]} throughout the data`;
    if (retrievedData["CityImg"]) {
        document.getElementById("dest-imag").src = `${retrievedData["CityImg"]}`;
    };
    if (retrievedData["returnDate"]) {
        document.getElementById("returnDate").innerText = `Returning: ${retrievedData["returnDate"]}`;
    };
}

const updateUI = (event) => {
    getCountryData(event)
    //     .then(data => {
    //         postData(data)
    //     })
    //     .then(() => {
    //         getData()
    //     })
}

export {
    greyPastDate,
    updateUI,
    dateDiffInDays
}