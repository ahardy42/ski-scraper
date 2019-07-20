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
    db.Article.updateOne({_id: id}, {isSaved: true});
})

// get saved articles from the database and show them on the page, along with comments
router.get("/api/saved", (req, res) => {
    db.Article.find({isSaved: true}, articles => {
        res.json(articles);
    });
});

// delete a saved article and associated comments
router.delete("/api/saved/:id", (req, res) => {
    let id = req.params.id;
    db.Article.findOneAndDelete({_id: id}, article => {
        let commentId = article.comment;
        db.Comment.deleteOne({_id: commentId});
    });
});

// add a comment to an article and re-render based on ONLY THE COMMENT (this is hooked to react afterall)
router.put("/api/comment/:id", (req, res) => {
    const id = req.params.id; // article ID that the comment is being referenced to
    db.Comment.create(req.body)
    .then(comment => {
        return db.Article.findOneAndUpdate({_id: id}, {comment: comment._id}, {new: true});
    })
    .then(article => {
        res.json(article);
    })
    .catch(err => {
        res.json(err);
    });
});

// delete a comment and update article
router.delete("/api/comment/:id", (req, res) => {
    let id = req.params.id;
    db.findOneAndDelete({_id: id}, comment => {
        let commentId = comment._id;
        return db.Article.findOneAndUpdate({comment: commentId}, {comment: null}, {new: true});
    })
    .then(article => {
        res.json(article);
    })
    .catch(err => {
        res.json(err);
    });
});

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