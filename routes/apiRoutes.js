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

// show all articles in db that aren't saved
router.get("/api/articles", (req, res) => {
    db.Article.find({isSaved: false}, (err, articles) => {
        if (err) throw new Error(err);
        res.json(articles);
    });
})

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
    db.Article.find({isSaved: true})
    .populate("comments")
    .then((articles) => {
        res.json(articles);
    })
    .catch(err => {
        res.json(err);
    })
});

// delete a saved article and associated comments
router.delete("/api/saved/:id", (req, res) => {
    let id = req.params.id;
    db.Article.findOneAndDelete({_id: id}, (err, article) => {
        if (err) throw new Error(err);
        if (article.comments) {
            console.log("there were comments", article.comments);
            let articleId = article._id;
            console.log("this is the article id", articleId);
            db.Comment.deleteMany({article: articleId})
            .then(wtf => {
                console.log(wtf);
            });
        }
        res.json(article);
    });
});

// add a comment to an article
router.put("/api/comment/:id", (req, res) => {
    const id = req.params.id; // article ID that the comment is being referenced to
    db.Comment.create(req.body)
    .then(comment => {
        let article = db.Article.findOneAndUpdate({_id: id}, { $push: {comments: comment._id}}, {new: true}).populate("comments");
        return article;
    })
    .then(article => {
        res.json(article);
    })
    .catch(err => {
        res.json(err);
    });
});

// delete a comment and update. article id is the comment id!
router.delete("/api/comment/:id", (req, res) => {
    // first delete the comment from the comment db
    let id = req.params.id;
    db.Comment.findOneAndDelete({_id: id})
    .then(comment => {
        let articleId = comment.article;
        let commentId = comment._id;
        return db.Article.findByIdAndUpdate({_id: articleId}, {$pull: {comment: commentId}})
    })
    .then(article => {
        res.json(article);
    })
    .catch(err => {
        res.json(err);
    });
})

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