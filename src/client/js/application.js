// define variables

// for testing purposes
const testScript = async event => {
    event.preventDefault();
    console.log("I am working");
};


// get day difference between two dates
const dateDiffInDays = (dateOne, dateTwo) => {
    const firstDate = new Date(dateOne), secondDate = new Date(dateTwo);
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
            "Latitude": geoNamesObj["geonames"][0]["lat"],
            "Longitude": geoNamesObj["geonames"][0]["lng"]
        };
        console.log(geoNamesData);
        return geoNamesData;
    } catch (error) {
        console.log(`error: ${error}`);

    }
};

// display the retrieved data from geonames
const displayInfo = async retrievedData => {

}


export {
    testScript,
    dateDiffInDays,
    greyPastDate,
    getCountryData
};