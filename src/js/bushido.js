import * as d3 from 'd3';

const margin = { top: 20, right: 30, bottom: 30, left: 50 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;
const formatTime = d3.timeFormat("%d.%m.%y");
const formatWeight = d3.format(".1f");

function create_svg(width, height, svg_id) {
    return d3.select(svg_id)
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
        .style("stroke", "lightgrey")
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
        .style("fill", "none")
        .style("stroke", "lightgrey")
}

export function render_chart() {
    const parseDate = d3.timeParse("%Y-%m-%d");
    const svg = create_svg(800, 600, "#weight");

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

export function draw_bars() {
    var margin = {
            top: 20,
            right: 20,
            bottom: 70,
            left: 40
        },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.timeParse("%Y-%m-%d");
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);
    var xAxis = d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%d.%m.%y"));
    var yAxis = d3.axisLeft(y)
        .ticks(10);
    var svg = create_svg(width, height, "#study")

    d3.json("private/study.json").then(data => {
        data.forEach(function (d) {
            d.date = parseDate(d.date);
            d.value = +d.value;
        });
        console.log(data)
        x.domain(data.map(function (d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.value;
        })]);
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Mio. CHF");
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .style("fill", "steelblue")
            .attr("x", function (d) {
                return x(d.date);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {
                return y(d.value);
            })
            .attr("height", function (d) {
                return height - y(d.value);
            });
    });
}