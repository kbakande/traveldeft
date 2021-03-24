// define variables


// for testing purposes
const testScript = async event => {
    event.preventDefault();
    console.log("I am working");
};

// set the min attribute in date picker
const greyPastDate = e => {
    const currentDate = new Date().toISOString().slice(0, 10);
    document.getElementById("date").setAttribute("min", `${currentDate}`);
    document.getElementById("date").setAttribute("placeholder", `${currentDate}`);
};

// for fetching data from geonames
const getCountryData = async event => {
    event.preventDefault();
    const formEl = event.currentTarget.querySelectorAll("input");
    const country = formEl[0].value;
    const apiURI = `http://api.geonames.org/searchJSON?q=${country}&maxRows=10&username=koakande`;
    const geoNamesStream = await fetch(apiURI);

    try {
        const geoNamesObj = await geoNamesStream.json();
        const geoNamesData = {
            "Country": geoNamesObj["geonames"][0]["countryName"],
            "latitude": geoNamesObj["geonames"][0]["lat"],
            "longitude": geoNamesObj["geonames"][0]["lng"]
        };
        console.log(geoNamesData);
        return geoNamesData;
    } catch (error) {
        console.log(`error: ${error}`);

    }
};

// get country from input field


export {
    testScript,
    greyPastDate,
    getCountryData
};