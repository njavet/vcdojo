import * as d3 from 'd3';

// Configuration
const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Formatters
const parseDate = d3.utcParse("%Q");
const formatTime = d3.timeFormat("%d.%m.%y")
const formatWeight = d3.format(".1f");

// Create SVG
function createSvg() {
    return d3.select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
}

// Create Scales
function createScales(data) {
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.datetime))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.weight) - 1, d3.max(data, d => d.weight) + 1])
        .range([height, 0]);

    return { xScale, yScale };
}

// Draw Axes
function drawAxes(svg, scales) {
    const { xScale, yScale } = scales;

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d => `${formatTime(new Date(d))}`))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(yScale).tickFormat(d => `${formatWeight(d)} Kg`));
}

// Draw Gridlines
function drawGridlines(svg, scales) {
    const { xScale, yScale } = scales;

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(10).tickSize(-height).tickFormat(""));

    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(yScale).ticks(10).tickSize(-width).tickFormat(""));
}

// Draw Line
function drawLine(svg, scales, data) {
    const { xScale, yScale } = scales;

    const line = d3.line()
        .x(d => xScale(d.datetime))
        .y(d => yScale(d.weight));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", "steelblue");
}

// Load Data and Render Chart
export function renderChart() {
    d3.json("static/weight_data.json").then(data => {
        // Parse and prepare data
        data.forEach(d => {
            d.datetime = parseDate(d.datetime)
        });

        // Create SVG and scales
        const svg = createSvg();
        const scales = createScales(data);

        // Draw chart components
        drawAxes(svg, scales);
        drawGridlines(svg, scales);
        drawLine(svg, scales, data);
    }).catch(error => {
        console.error('Error loading or parsing the data:', error);
    });
}
