

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";


const chart = (chartData) => {
    console.log("chartData", chartData.data.map(d => d[1]))
    ///////////////////////
    // CANVAS DIMENTIONS //
    ///////////////////////
    const w = 800;
    const h = 450;
    const padding = {
        top: 50,
        right: 50,
        bottom: 100,
        left: 50
    }

    const xScale = d3.scaleBand()
        .domain(chartData.data.map(d => d[0]))
        .range([padding.left, w - padding.right])
        .padding(0.1)
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData.data, (d) => d[1])])
        .range([h - padding.top, padding.bottom])

    console.log(xScale)
    

    const svg = d3.select(".main")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
    // .style("background-color", "red")


    const bars = svg.selectAll("rect")
        .data(chartData.data)
        .enter()
        .append("rect")
        .attr("width", xScale.bandwidth())
        .attr("height", d => h - yScale(d[1]))
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
    
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    svg.append("g")
        .attr(`transform, translate(0, ${h - padding.left})`)
        .call(xAxis)

    svg.append("g")
        .attr(`transform, translate(${padding.left}, 0)`)
        .call(yAxis)



}



const fetchedData = d3.json(url)
    .then(d => {
        console.log(d.data)
        return chart(d)
    })
    .catch(e => console.log(e))

console.log("fetchedData", fetchedData)
