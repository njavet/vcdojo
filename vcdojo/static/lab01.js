import * as d3 from 'https://cdn.skypack.dev/d3@7';

const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
const formatDate = d3.timeFormat("%d.%m.%y");
const parseDate = d3.timeParse("%Y-%m-%d");
const formatWeight = d3.format(".1f");

const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


d3.json("static/weight_data.json").then(data => {
    data.forEach(d => {
        d.date = parseDate(d.date);
        d.weight = +d.weight;
    });

    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.weight) - 1, d3.max(data, d => d.weight) + 1])
        .range([height, 0]);

    const yScaleFat = d3.scaleLinear()
        .domain([d3.min(data, d => d.muscles) - 1, d3.max(data, d => d.muscles) + 1])
        .range([height, 0]);

    const lineFat = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScaleFat(d.muscles));

    /*
    const fatLine = svg.append("path")
        .datum(data)
        .attr("class", "line fat")
        .attr("d", lineFat)
        .style("stroke", "green");
        */


    const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.weight));

    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.bottom - 5)
        .text("Date");

    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "end")
        .attr("x", -margin.left + 10)
        .attr("y", -10)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Weight (kg)");

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale)
        .tickFormat(formatDate))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(yScale)
            .tickFormat(d => `${formatWeight(d)} Kg`));

    function makeXGridlines() {
        return d3.axisBottom(xScale).ticks(10);
    }

    function makeYGridlines() {
        return d3.axisLeft(yScale).ticks(10);
    }

    const lineUnder90 = d3.line()
        .x(d => xScale(d.date))
        .y(d => d.weight < 90 ? yScale(d.weight) : null);

    const lineOver90 = d3.line()
        .x(d => xScale(d.date))
        .y(d => d.weight >= 90 ? yScale(d.weight) : null);

    svg.append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0,${height})`)
    .call(makeXGridlines()
    .tickSize(-height)
    .tickFormat(""));

    svg.append("g")
    .attr("class", "grid")
    .call(makeYGridlines()
    .tickSize(-width)
    .tickFormat(""));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", "steelblue");

    d3.select("#toggle-fat").on("click", () => {
        const isHidden = fatLine.classed("hidden");
        fatLine.classed("hidden", !isHidden);  // Toggle the 'hidden' class
    });

}).catch(error => {
    console.error('Error loading or parsing the data:', error);
});

