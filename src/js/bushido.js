import * as d3 from 'd3';

const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
const formatTime = d3.timeFormat("%d.%m.%y");
const formatWeight = d3.format(".1f");

function create_svg(width, height) {
    return d3.select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
}

function create_scales(data) {
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.weight) - 1, d3.max(data, d => d.weight) + 1])
        .range([height, 0]);

    return { xScale, yScale };
}

function draw_axes(svg, scales) {
    const { xScale, yScale } = scales;

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(formatTime))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("class", "axis y-axis")
        .call(d3.axisLeft(yScale).tickFormat(d => `${formatWeight(d)} Kg`));
}

function draw_gridlines(svg, scales) {
    const { xScale, yScale } = scales;

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).ticks(10).tickSize(-height).tickFormat(""));

    svg.append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(yScale).ticks(10).tickSize(-width).tickFormat(""));
}

function draw_line(svg, scales, data) {
    const { xScale, yScale } = scales;

    const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.weight));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style("stroke", "red");
}

export function render_chart(container) {
    const parseDate = d3.timeParse("%Y-%m-%d");
    const svg = create_svg(800, 600,);

    d3.json("private/weight.json").then(data => {
        data.forEach(d => {
            d.date = parseDate(d.date);
            d.weight = +d.weight;
        });

        const scales = create_scales(data);
        draw_gridlines(svg, scales)
        draw_axes(svg, scales)
        draw_line(svg, scales, data);
    }).catch(error => {
        console.error('Error loading or parsing the data:', error);
    });
}