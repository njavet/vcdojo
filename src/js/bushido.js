import * as d3 from 'd3';

const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
const formatDate = d3.timeFormat("%d.%m.%y");
const formatWeight = d3.format(".1f");

const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const parseDate = d3.timeParse("%Y-%m-%d");

export function render_chart() {
    d3.json("private/weight.json").then(data => {
        data.forEach(d => {
            d.date = parseDate(d.date);
            d.weight = +d.weight;
        });
        console.log(data)

        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([0, width]);
        console.log(xScale.domain())

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.weight) - 1, d3.max(data, d => d.weight) + 1])
            .range([height, 0]);

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

    }).catch(error => {
        console.error('Error loading or parsing the data:', error);
    });
}