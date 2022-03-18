import {
    csvFormatBody,
    json
} from 'd3';
import * as d3 from 'd3';

Promise.all([
        json('https://jsonplaceholder.typicode.com/posts'),
        json('https://jsonplaceholder.typicode.com/users')
    ])
    .then(([posts, users]) => {
        // Créer tableau d'objets
        const usersPosts = [];
        users.forEach(user => {
            const userId = user.id;
            const person = {
                nom_utilisateur: user.name,
                ville: user.address.city,
                nom_companie: user.company.name
            };
            const userPosts = posts.filter((d, i) => {
                return d.userId == userId;
            });
            const titre_posts = [];
            userPosts.forEach(post => {
                titre_posts.push(post.title);
            });
            person['titre_posts'] = titre_posts;

            usersPosts.push(person);
        });

        // Calculer le nombre de posts par user
        const body = document.querySelector('body');
        const h3a = document.createElement('h3');
        const node1 = document.createTextNode('Nombre de posts par utilisateur : ');
        h3a.append(node1);
        body.append(h3a);
        const ul = document.createElement('ul');
        body.append(ul);
        usersPosts.forEach(userPosts => {
            const li = document.createElement('li');
            const node = document.createTextNode('User ' + userPosts.nom_utilisateur + ' : ' + userPosts.titre_posts.length + ' posts');
            li.append(node);
            body.append(li);
        });

        // Trouver le user qui a écrit le texte le plus long dans posts.body
        const h3b = document.createElement('h3');
        const node2 = document.createTextNode("L'utilisateur avec le plus long post : ");
        h3b.append(node2);
        body.append(h3b);

        posts.sort((a, b) => (a.body.length > b.body.length) ? 1 : ((b.body.length > a.body.length) ? -1 : 0))
        const userId = posts[posts.length - 1].userId;
        const userLongerPost = users.filter((d, i) => {
            return d.id == userId;
        });
        const p = document.createElement('p');
        const node3 = document.createTextNode('User ' + userLongerPost[0].name);
        p.append(node3);
        body.append(p);

        // Graphique en bâton
        const h3c = document.createElement('h3');
        const node4 = document.createTextNode("Graphqiue du nombre de posts par utilisateur :");
        h3c.append(node4);
        body.append(h3c);

        const bodyD3 = d3.select("body");
        bodyD3.append("div").append("svg");
        const svg = d3.select("svg");

        const data = [20, 5, 25, 8, 15];

        const bars = svg.selectAll("g")
            .data(usersPosts)
            .enter()
            .append("g")

        bars.append("rect")
            .attr("x", (d, i) => i * 21)
            .attr("y", (d) => 50 - d)
            .attr("width", 20)
            .attr("height", (d) => 50 - 2 * d.titre_posts.length)

        // Étiquettes bâtons
        bars.append("text")
            .attr("x", (d, i) => i * 21)
            .attr("y", (d, i) => 50)
            .text((d) => d.titre_posts.length)
    });