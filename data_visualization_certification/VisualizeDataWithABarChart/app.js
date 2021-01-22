

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";


const chart = ({ data, description, urlize_name }) => {

    ////////////
    // CANVAS //
    ////////////

    const w = 900;
    const h = 460;
    const padding = { top: 40, right: 30, bottom: 50, left: 50 }

    const maxDate = d3.max(data.map(d => new Date(d[0])))
    const minDate = d3.min(data.map(d => new Date(d[0])))

    const svg = d3.select(".main")
        .append("svg")
        .attr("width", w)
        .attr("height", h)

    ////////////
    // SCALES //
    ////////////

    const xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([padding.left, w - padding.right])

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d[1])])
        .range([h - padding.bottom, padding.top])
    

    //////////
    // BARS //
    //////////

    const barWidth = (w - padding.left - padding.right) / data.length - 0.2

    const bars = svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("width", barWidth)
        .attr("height", d => h - padding.bottom - yScale(d[1]))
        .attr("x", d => xScale(new Date(d[0])))
        .attr("y", d => yScale(d[1]))


    ///////////
    // AXLES //
    ///////////

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    const xAxisDefined = svg.append("g")
        .attr("id", "x-axis")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${h - padding.bottom})`)
        .call(xAxis)

    const xSubtitle = xAxisDefined.append("text")
        .text("More Information: " + description.split("(")[2].replaceAll(")", ""))
        .classed("xSubtitle", true)
        .attr("transform", `translate(${w - padding.right - padding.left - 85},${40})`)
        .style("fill", "black")

    const yAxisDefined = svg.append("g")
        .attr("id", "y-axis")
        .attr("class", "axis")
        .attr("transform", `translate(${padding.left}, 0)`)
        .call(yAxis)

    const ySubtitle = yAxisDefined.append("text")
        .text(urlize_name.split("1")[0].replaceAll("-", " ").trim())
        .classed("ySubtitle", true)
        .style("fill", "black")
        .attr("transform", `translate(${padding.right - 5},${padding.top}) rotate(270)`)

}



const fetchedData = d3.json(url)
    .then(d => {
        console.log(d.data)
        return chart(d)
    })
    .catch(e => console.log(e))


