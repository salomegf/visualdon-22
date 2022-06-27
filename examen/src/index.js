/*//import * as d3 from 'd3'

// Import des données
import data from '../data/countries.geojson'

// Exercice 1

const ex1 = d3.select("#ex1")

// Grille
ex1.append("g")
    .attr("id", "grid")
const grid = d3.select('#grid')

for (let i = 0; i <= 100; i += 10) {
    grid.append("line")
        .attr("x1", i)
        .attr("y1", "0")
        .attr("x2", i)
        .attr("y2", "100")
        .attr("stroke", "black")
        .attr("stroke-width", .2)

    grid.append("line")
        .attr("x1", "0")
        .attr("y1", i)
        .attr("x2", "100")
        .attr("y2", i)
        .attr("stroke", "black")
        .attr("stroke-width", .2)
}

// Lignes
ex1.append("g")
    .attr("id", "lines")
const lines = d3.select('#lines')

lines.append("path")
    .attr("d", "M 20 10 V 70 H 70 V 10 H 30 V 60 H 60 V 30 H 40 V 50 H 50 V 40")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("fill", "none")

// Cercle
ex1.append("circle")
    .attr("cx", 50)
    .attr("cy", 40)
    .attr("r", 5)
    .attr("fill", "red")


// -------------------------------------------------------------------------------

// Exercice 2

// Pays avec plus de 1'000'000 habitants
const bigCountries = data.features.filter((d, i) => {
    return d.properties.POP2005 > 1000000
})

// Moyenne par continent
const ex2 = d3.select("#ex2")

const continents = [{
    nom: 'Europe',
    region: 150,
    pop: ''
}, {
    nom: 'Afrique',
    region: 2,
    pop: ''
}, {
    nom: 'Asie',
    region: 142,
    pop: ''
}, {
    nom: 'Océanie',
    region: 9,
    pop: ''
}, {
    nom: 'Amériques',
    region: 19,
    pop: ''
}]

continents.forEach(continent => {
    const paysContinent = bigCountries.filter((d, i) => {
        return d.properties.REGION == continent.region
    })

    const paysPop = paysContinent.map((d, i) => {
        return d.properties.POP2005
    })

    const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length
    const popAvg = Math.round(avg(paysPop))

    continent.pop = popAvg

    ex2.append("p")
        .text(continent.nom + " : " + continent.pop)
});


// -------------------------------------------------------------------------------

// Exercice 3

//Carte
const ex3a = d3.select("#ex3a")

const colorScale = d3.scaleSqrt()
    .domain([0, 1312978855])
    .range(["white", "orange"])

const tooltip3a = d3.select("#tooltip3a")
    .style("opacity", 0);

const path = d3.geoPath();
const projection = d3.geoMercator()
    .scale(100)
    .translate([300, 270]);

ex3a.append("g")
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath()
        .projection(projection)
    )
    .style("fill", (d) => colorScale(d.properties.POP2005))
    .style("stroke", "lightgray")
    .attr("class", (d) => d.properties.NAME)
    .attr("data-population", (d) => d.properties.POP2005)
    .attr("data-country", (d) => d.properties.NAME)
    .on("mouseover", function (d, i) {
        tooltip3a
            .style("opacity", 1)
            .html(this.dataset.country + " : " + this.dataset.population)
    })
    .on("mouseout", function (d) {
        tooltip3a.style("opacity", 0);
    });

//Diagramme en bâtons
const ex3b = d3.select("#ex3b")

const margin = {
        top: 40,
        right: 40,
        bottom: 40,
        left: 60
    },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

ex3b.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr("id", "g3b")

const g3b = d3.select("#g3b")

const x = d3.scaleSqrt()
    .domain([0, 110000000])
    .range([0, width])
g3b.append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

const y = d3.scaleBand()
    .domain(continents.map(d => d.nom))
    .range([0, height])
    .padding(.5);
g3b.append('g')
    .call(d3.axisLeft(y))

console.log(continents)

const tooltip3b = d3.select("#tooltip3b")
    //.style("opacity", 0);

g3b.selectAll("rect")
    .data(continents)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(d.nom))
    .attr("height", y.bandwidth())
    .style("fill", "orange")
    .style("stroke", "transparent")
    .transition()
    .duration(1000)
    .attr("width", (d) => x(d.pop))
    .attr("data-population", (d) => d.pop)
    .attr("data-continent", (d) => d.nom)
    //tooltips fonctionnent pas !!!
    .on("mouseover", function (d, i) {
        tooltip3b
            .style("opacity", 1)
            .html(this.dataset.continent + " : " + this.dataset.population)
    })
    .on("mouseout", function (d) {
        tooltip3b.style("opacity", 0);
    });

 */
    
// -------------------------------------------------------------------------------

// Exercice 4
//import puppeteer from 'puppeteer'
const puppeteer = require('puppeteer');

const url = 'https://heig-vd.ch/formations/bachelor/filieres';


// Capture d'écran
(async() => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 2500 })
    await page.goto(url)
    
    //await page.screenshot({ path: 'screenshot.png' })


    //await page.$('td.prog'); // document.querySelector
	const filières = await page.$$('tbody'); // document.querySelectorAll
    console.log(filières)


    await browser.close()
})();

/* // fillieres 
(async() => {
    const response = await axios.get(url)
    const dom = new JSDOM(response.data);
    let fillieresTd = dom.window.document.querySelectorAll(".liste-formations td");
    //console.log(p[0].querySelectorAll("div.ratings p")[1].getAttribute("data-rating"));
    const fillieresName = [];

    const orientations = [];

    for (const td of fillieresTd) {
        if (td.classList.contains("prog")) {
            fillieresName.push(td.innerText);
        }
    }
    console.log(fillieresName);

    for (const td of fillieresTd) {
        if (td.classList.contains("ori")) {
            orientations.push(td.innerText);
        }
    }

    console.log(orientations);

})(); */