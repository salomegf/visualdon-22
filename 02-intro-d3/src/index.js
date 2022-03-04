import * as d3 from 'd3';

// C'est ici que vous allez écrire les premières lignes en d3!

const body = d3.select("body");
const svg = d3.select(".svg1");
const cercle1 = svg.select(".cercle1");
const cercle2 = svg.select(".cercle2");
const cercle3 = svg.select(".cercle3");

//attributs
cercle2.attr("fill", "red");
cercle1.attr("cx", 100);
cercle2.attr("cx", 200);

//append
svg.append("text").text("Cercle 1").attr("x", 100).attr("y", 105).attr("text-anchor", "middle");
svg.append("text").text("Cercle 2").attr("x", 200).attr("y", 205).attr("text-anchor", "middle");
svg.append("text").text("Cercle 3").attr("x", 250).attr("y", 305).attr("text-anchor", "middle");

//événements
cercle3.on("click", () => {
    svg.selectAll("circle, text")
        .attr("cx", 150)
        .attr("x", 150);
})

//données
body.append("div").append("svg").attr("class", "svg2");
const svg2 = d3.select(".svg2");
const data = [20, 5, 25, 8, 15];

svg2.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 21)
    .attr("y", (d) => 30 - d)
    .attr("width", 20)
    .attr("height", (d) => d);