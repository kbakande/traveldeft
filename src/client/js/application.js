// define variables

// for testing purposes
const testScript = async event => {
    event.preventDefault();
    console.log("I am working");
};

// const icon = "https://www.weatherbit.io/static/img/icons/r01d.png";

// get day difference between two dates
const dateDiffInDays = (laterDate) => {
    const firstDate = new Date(new Date().toISOString().slice(0, 10)), secondDate = new Date(laterDate);
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
    const formEl = document.querySelector(".input-holder").querySelectorAll("input");
    const cityName = formEl[0].value;
    const departureDate = formEl[1].value;
};

// for fetching data from geonames
const getCountryData = async event => {
    event.preventDefault();
    const formEl = event.currentTarget.querySelectorAll("input");
    const cityName = formEl[0].value;
    const departureDate = formEl[1].value;
    const days2departure = dateDiffInDays(departureDate);
    const apiURI = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=10&username=koakande`;
    const geoNamesStream = await fetch(apiURI);
    try {
        const geoNamesObj = await geoNamesStream.json();
        const geoNamesData = {
            "City": geoNamesObj["geonames"][0]["toponymName"],
            "Country": geoNamesObj["geonames"][0]["countryName"],
            "Latitude": geoNamesObj["geonames"][0]["lat"],
            "Longitude": geoNamesObj["geonames"][0]["lng"],
            "departureDate": departureDate,
            "daysToDeparture": days2departure
        };
        // console.log(geoNamesObj, cityName, departureDate, days2departure);
        displayInfo(geoNamesData);
        getWeatherBitData(geoNamesData);
        gePixaBayImg(geoNamesData["City"]);
        return geoNamesData;
    } catch (error) {
        console.log(`error: ${error}`);

    }
};

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
            console.log(geoData);
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
            console.log(geoData);
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
};

const gePixaBayImg = async pixCityName => {
    const pixBayAPI = "20843692-350cf2ac1c16bbb7ec469b3f2";
    const pixBayURL = `https://pixabay.com/api/?key=${pixBayAPI}&q=${pixCityName}`;
    const pixBayStream = await fetch(pixBayURL);

    try {
        const pixBayData = await pixBayStream.json();
        const cityImgLink = pixBayData["hits"][0]["webformatURL"];
        return cityImgLink;
    } catch (error) {
        console.log(`error:${error}`);
    }
}

// display the retrieved data from geonames
const displayInfo = retrievedData => {
    document.getElementById("destination").innerText = `My trip to: ${retrievedData["City"]}, ${retrievedData["Country"]}`
    document.getElementById("departure-day").innerText = `Departing: ${retrievedData["departureDate"]}`
    document.getElementById("days-away").innerText = `${retrievedData["City"]}, ${retrievedData["Country"]} is ${retrievedData["daysToDeparture"]} days away`
}


export {
    testScript,
    greyPastDate,
    getCountryData,
    getWeatherBitData
};