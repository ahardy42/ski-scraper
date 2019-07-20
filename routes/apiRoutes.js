const express = require('express');
const router = express.Router();
const path = require("path");
const axios = require("axios");
// const db = require("./models");
const cheerio = require("cheerio");

// send the homepage

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../views/public/index.html'));
})

// set up some api routes for the front end

router.get("/api/scrape", (req, res) => {
    console.log("router works");
    axios.get("https://fasterskier.com/").then(response => {
        const $ = cheerio.load(response.data);

        const results = [];
        $("article").each((i, article) => {
            let fullPara = $(article).find(".entry-content>p").text();
            let description = fullPara;
            if (fullPara.length > 200) {
                let endIndex = fullPara.indexOf(" ", 200);
                description = fullPara.slice(0, endIndex) + "..."; 
            }
            const data = {};
            data.header = $(article).find(".entry-title").text();
            data.href = $(article).find(".entry-title-link").attr("href");
            data.img = $(article).find("img").attr("src");
            data.description = description;
            data.published = $(article).find("time").attr("datetime");
            results.push(data);
        });
        res.json(results);
    });
});

module.exports = router;