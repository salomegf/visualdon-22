<<<<<<< HEAD
import * as d3 from 'd3';
import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');
    //await page.screenshot({ path: 'cantons.png' });

    await browser.close();
})();
=======
import * as puppeteer from "puppeteer";
>>>>>>> d94735becdc88ec3a995e077f2c8b40b2c77c556
