const express = require('express');
const router = express.Router();
const path = require("path");
const axios = require("axios");
const db = require("../models");
const cheerio = require("cheerio");

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
        }).then((articles) => {
            console.log(articles);
            res.redirect("/api/articles");
        }).catch((err) => {
            console.log(err);
            res.redirect("/api/articles");
        });
    })
    .catch(err => {
        console.log(err);
    });
});

// show all articles in db that aren't saved, sort by publish date
router.get("/api/articles", (req, res) => {
    db.Article.find().sort({published: -1}).exec((err, articles) => {
        if (err) throw new Error(err);
        res.json(articles);
    });
})

// save an article
router.get("/api/saved/:id", (req, res) => {
    let id = req.params.id;
    db.Article.findByIdAndUpdate(id, {isSaved : true}, (err, article) => {
        if (err) throw new Error(err);
        let clonedArticle = {
            header : article.header,
            href : article.href,
            img : article.img,
            description : article.description,
            published : article.published,
            article: id
        };
        db.Saved.create(clonedArticle)
        .then(newArticle => {
            res.json(newArticle);
        })
        .catch(err => {
            res.json(err);
        });
    });
})

// get saved articles from the database and show them on the page, along with comments
router.get("/api/saved", (req, res) => {
    db.Saved.find()
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
    db.Saved.findOneAndDelete({_id: id}, (err, article) => {
        if (err) throw new Error(err);
        console.log(article.article);
        db.Article.findByIdAndUpdate(article.article, {isSaved: false}).exec(); // find the corresponding article by its id ref and updated isSaved to false
        if (article.comments) {
            let articleId = article._id;
            db.Comment.deleteMany({article: articleId})
            .then(wtf => {
                console.log(wtf);
            })
            .catch(err => console.log(err));
        }
        res.json(article);
    });
});

// add a comment to an article
router.put("/api/comment/:id", (req, res) => {
    const id = req.params.id; // article ID that the comment is being referenced to
    let {body} = req;
    body.article = id;
    db.Comment.create(body)
    .then(comment => {
        let article = db.Saved.findOneAndUpdate({_id: id}, { $push: {comments: comment._id}}, {new: true}).populate("comments");
        return article;
    })
    .then(article => {
        res.json(article);
    })
    .catch(err => {
        res.json(err);
    });
});

// delete a comment and update. id is the comment id!
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
});

// send the homepage if no api routes are being called (for production build)
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
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