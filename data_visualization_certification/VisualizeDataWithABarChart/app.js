
let data;
const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

fetch(url)
    .then(response => response.json)
    .then(fetchedData => data = fetchedData)