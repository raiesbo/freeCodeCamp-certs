

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";


const chart = (chartData) => {

    console.log("chartData", chartData.data.map(d => d[1]))

    const w = "60vw";
    const h = "60vh";
    const margin = {
        top: 100,
        right: 50,
        bottom: 50,
        left: 50
    }


    const yAxis = d3.scaleLinear()
    // .domian(0, d3.max(chartData.data, (d) => d[1]))
    // .range()

    const svg = d3.select(".main")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
    // .style("background-color", "red")
}



const fetchedData = d3.json(url)
    .then(d => {
        console.log(d.data)
        return chart(d)
    })
    .catch(e => console.log(e))

console.log("fetchedData", fetchedData)
