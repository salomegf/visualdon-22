import * as d3 from 'd3'
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

const svg = d3.select("svg");

//Échelles
const x = d3.scaleLinear()
    .domain([0, 100000])
    .range([0, width])

const y = d3.scaleLinear()
    .domain([50, 90])
    .range([height, 0])

//SVG + translation
svg.attr("width", width + margin.left + margin.right)
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
    //.attr("r", 10)
    .attr("r", (d) => scalePop(d.population))
    //.attr("r", (d) => Math.log(d.population)/2)
    .style("fill", "orange")
    .style("stroke", "orange")
    .style("fill-opacity", 0.3);