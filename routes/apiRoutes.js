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
        const kiddos = $("article header a");
        console.log(kiddos[0]);
    });
});

module.exports = router;