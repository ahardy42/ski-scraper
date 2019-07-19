const express = require('express');
const router = express.Router();
const path = require("path");
const axios = require("axios");
// const db = require("./models");
const cheerio = require("cheerio");

// send the homepage

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// set up some api routes for the front end

router.get("/api/scrape", (req, res) => {
    console.log("router works");
    axios.get("https://fasterskier.com/").then(response => {
        const $ = cheerio.load(response.data);

        const results = [];
        $("article").each((i, article) => {
            const data = {};
            data.header = $(article).find(".entry-title").text();
            data.href = $(article).find(".entry-title-link").attr("href");
            data.img = $(article).find("img").attr("src");
            data.description = blaaaa;
            results.push(data);
        });
        res.json(results);
        // console.log(results);
    });
});

module.exports = router;