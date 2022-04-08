//import * as d3 from 'd3'
import {
    scaleSqrt
} from 'd3'
import incomeString from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import lifeExpectancy from '../data/life_expectancy_years.csv'
import populationString from '../data/population_total_better.csv'
import populationString2 from '../data/population_total_better.csv'

import arrayTransformed from './lib/arrayTransformed.js'
import merge from './lib/merge.js'

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

//console.log(y2021);

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


/* 
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
} */


//Animation

//Tableau des années
const data = merge(incomeString, populationString2, lifeExpectancy);
//console.log(data);

const annee2021 = data.filter(data => data.annee == 2021)
//console.log(annee2021[0].data);

//Echelles
const x2 = d3.scaleSqrt()
    .domain([0, 100000])
    .range([0, width])

const y2 = d3.scaleLinear()
    .domain([15, 90])
    .range([height, 0])

const scalePop2 = scaleSqrt()
    .domain([0, 1400000000])
    .range([0, 30])

body.append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g").attr("class", "group3")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//Axes
const g3 = d3.select(".group3");

g3.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2))

g3.append('g')
    .call(d3.axisLeft(y2))

g3.append('text')
    .text('')
    .attr("class", "annee")



//Données
/* const annee2021 = allData.filter(allData => allData.annee == 2021)
console.log(annee2021[0].data);

g3.selectAll("circle")
    .data(annee2021[0].data)
    .enter()
    .append("circle")
    .attr("class", (d) => d.country)
    .attr("cx", (d) => x(d.income))
    .attr("cy", (d) => y(d.life))
    .attr("r", (d) => scalePop(d.pop))
    .style("fill", "orange")
    .style("stroke", "orange")
    .style("fill-opacity", 0.3); */

//Variable où on stocke l'id de notre intervalle
let nIntervId;

function animate() {
    // regarder si l'intervalle a été déjà démarré
    if (!nIntervId) {
        nIntervId = setInterval(play, 100);
    }
}

let j = 0;

function play() {
    // Recommencer si à la fin du tableau
    if (data[j].annee == 2021 /*j == data.length - 1*/ ) {
        j = 0;
    } else {
        j++;
    }
    // Mise à jour graphique
    d3.select('.annee').text(data[j].annee)

    updateChart(data[j].data);
}

// Mettre en pause
function stop() {
    clearInterval(nIntervId);
    nIntervId = null;
}

// Fonction de mise à jour du graphique
function updateChart(data_iteration) {
    g3.selectAll("circle")
        .data(data_iteration)
        .join(enter => enter.append('circle')
            .attr("class", (d) => d.country)
            .attr("cx", (d) => x2(d.income))
            .attr("cy", (d) => y2(d.life))
            .attr("r", (d) => scalePop2(d.pop))
            .style("fill", "orange")
            .style("stroke", "orange")
            .style("fill-opacity", 0.3),
            update => update
            .transition(d3.transition()
                .duration(50)
                .ease(d3.easeLinear)).attr("cx", (d) => x2(d.income))
            .transition(d3.transition()
                .duration(50)
                .ease(d3.easeLinear)).attr("cy", (d) => y2(d.life))
            .transition(d3.transition()
                .duration(50)
                .ease(d3.easeLinear)).attr("r", (d) => scalePop2(d.pop)),
            exit => exit.remove());
}

// Event listener
const btnPlay = document.createElement("button");
btnPlay.innerHTML = "Play";
btnPlay.id = "play";
document.body.appendChild(btnPlay);

const btnStop = document.createElement("button");
btnStop.innerHTML = "Stop";
btnStop.id = "stop";
document.body.appendChild(btnStop);

//document.getElementById("play").addEventListener("click", animate);
document.getElementById("play").addEventListener("click", () => {
    animate();
    //console.log('play');
});
//document.getElementById("stop").addEventListener("click", stop);
document.getElementById("stop").addEventListener("click", () => {
    stop();
    //console.log('stop');
});