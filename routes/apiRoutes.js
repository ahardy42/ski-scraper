const express = require('express');
const router = express.Router();
const path = require("path");
const axios = require("axios");
const db = require("../models");
const cheerio = require("cheerio");

// send the homepage

// router.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/public/index.html'));
// })

// set up some api routes for the front end

router.get("/api/scrape", (req, res) => {
    axios.get("https://fasterskier.com/").then(response => {
        const $ = cheerio.load(response.data);
        const results = [];
        $("article").each((i, article) => {
            let data = scraperHelper($, article);
            results.push(data);
        });
       // save new articles to the database, based on published date being unique
        db.Article.insertMany(results, {
            ordered: false
        }).then((result) => {
            res.json(result);
        }).catch((err) => {
            res.json(err);
        });
    });
});

// save an article
router.put("/api/saved/:id", (req, res) => {
    let id = req.params.id;
    db.Article.findOneAndUpdate({_id: id}, {isSaved: true}, {new: true}, (err, article) => {
        if (err) throw new Error(err);
        res.json(article);
    });
})

// get saved articles from the database and show them on the page, along with comments
router.get("/api/saved", (req, res) => {
    db.Article.find({isSaved: true}, (err, articles) => {
        if (err) throw new Error(err);
        res.json(articles);
    });
});

// delete a saved article and associated comments
router.delete("/api/saved/:id", (req, res) => {
    let id = req.params.id;
    db.Article.findOneAndDelete({_id: id}, (err, article) => {
        if (err) throw new Error(err);
        if (article.comment) {
            let commentId = article.comment;
            return db.Comment.findOneAndDelete({_id: commentId}, (err, comment));
        } else {
            res.json(article);
        }
    });
});

// add a comment to an article
router.put("/api/comment/:id", (req, res) => {
    const id = req.params.id; // article ID that the comment is being referenced to
    console.log(req.body);
    db.Comment.create(req.body)
    .then(comment => {
        let article = db.Article.findOneAndUpdate({_id: id}, {comment: comment._id}, {new: true}).populate("comment");
        console.log(article);
        return article;
    })
    .then(article => {
        console.log(article);
        res.json(article);
    })
    .catch(err => {
        res.json(err);
    });
});

// delete a comment and update article id is the article id!
// coming soon

const scraperHelper = ($, article) => {
    let fullPara = $(article).find(".entry-content>p").text();
    let description = fullPara;
    if (fullPara.length > 200) {
        let endIndex = fullPara.indexOf(" ", 200);
        description = fullPara.slice(0, endIndex) + "...";
    }
    let data = {};
    data.header = $(article).find(".entry-title").text();
    data.href = $(article).find(".entry-title-link").attr("href");
    data.img = $(article).find("img").attr("src");
    data.description = description;
    data.published = $(article).find("time").attr("datetime");
    return data;
}

module.exports = router;