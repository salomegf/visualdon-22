//import * as d3 from 'd3'
import {
    scaleSqrt
} from 'd3'
import incomeString from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import lifeExpectancy from '../data/life_expectancy_years.csv'
import populationString from '../data/population_total_better.csv'

import arrayTransformed from './lib/arrayTransformed.js'

const income = arrayTransformed(incomeString);
const population = arrayTransformed(populationString);

const countries = income.map((d, i) => {
    return d.country;
})

const income2021 = income.map((d, i) => {
    return d["2021"];
})

const lifeExpectancy2021 = lifeExpectancy.map((d, i) => {
    return d["2021"];
})

const polulation2021 = population.map((d, i) => {
    return d["2021"];
})

// Création tableau données 2021 par pays
let y2021 = [];
let i = 0;
countries.forEach(country => {
    country = {
        country: country,
        income: income2021[i],
        life_expectancy: lifeExpectancy2021[i],
        population: polulation2021[i]
    }
    y2021.push(country);
    i++;
});

console.log(y2021);

//Marges
const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const body = d3.select("body");

//Échelles
const x = d3.scaleSqrt()
    .domain([0, 100000])
    .range([0, width])

const y = d3.scaleLinear()
    .domain([50, 90])
    .range([height, 0])

//SVG + translation
body.append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("class", "group")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//Axes
const g = d3.select(".group");

g.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

g.append('g')
    .call(d3.axisLeft(y))

//Données
const scalePop = scaleSqrt()
    .domain([0, 1400000000])
    .range([0, 30])

g.selectAll("circle")
    .data(y2021)
    .enter()
    .append("circle")
    .attr("class", (d) => d.country)
    .attr("cx", (d) => x(d.income))
    .attr("cy", (d) => y(d.life_expectancy))
    .attr("r", (d) => scalePop(d.population))
    .style("fill", "orange")
    .style("stroke", "orange")
    .style("fill-opacity", 0.3);



// Cartographie
const margin2 = {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
    },
    width2 = 600 - margin2.left - margin2.right,
    height2 = 400 - margin2.top - margin2.bottom;

body.append('svg')
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g").attr("class", "group2")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")

const g2 = d3.select(".group2");

// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
    .scale(85)
    .center([0, 45])
    .translate([width / 2, height / 2]);

// Data and color scale
//const data = d3.map();
const colorScale = d3.scaleThreshold()
    .domain([50, 60, 70, 80, 90])
    .range(d3.schemeOranges[5]);

// Load external data and boot
d3.queue()
    .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    .await(ready);

function ready(error, topo) {

    let mouseOver = function (d) {
        d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", .5)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", 1)
            .style("stroke", "black")
    }

    let mouseLeave = function (d) {
        d3.selectAll(".Country")
            .transition()
            .duration(200)
            .style("opacity", .8)
        d3.select(this)
            .transition()
            .duration(200)
            .style("stroke", "transparent")
    }

    // Draw the map
    g2.append("g")
        .selectAll("path")
        .data(topo.features)
        .enter()
        .append("path")
        // draw each country
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        // set the color of each country
        .attr("fill", function (d, i) {
            const country = y2021.filter(y2021 => y2021.country == d.properties.name)
            
            let lifeExp = ''
            if (country[0] === undefined) {
                lifeExp = 0;
            } else {
                lifeExp = country[0].life_expectancy
            }
            return colorScale(lifeExp);
        })
        .style("stroke", "transparent")
        .attr("class", function (d) {
            return d.properties.name
        })
        .style("opacity", .8)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
}