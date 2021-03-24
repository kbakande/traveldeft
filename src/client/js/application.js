// for testing purposes
const testScript = async (e) => {
    e.preventDefault();
    console.log(e.target);
    alert("I am working");
};

// set the min attribute in date picker
const greyPastDate = e => {
    const currentDate = new Date().toISOString().slice(0, 10);
    document.getElementById("date").setAttribute("min", `${currentDate}`);
}

// for fetching data from geonames
const fetchGeoNames = async (e) => {
    e.preventDefault();
}

export {
    testScript,
    greyPastDate
};