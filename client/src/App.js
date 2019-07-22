import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Saved from './components/Saved';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      saved: []
    }
    this.scrapeSite = this.scrapeSite.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.getSaved = this.getSaved.bind(this);
    this.showArticles = this.showArticles.bind(this);
    this.mainPage = this.mainPage.bind(this);
    this.savedPage = this.savedPage.bind(this);
  }
  componentDidMount() {
    this.scrapeSite();
  }
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" render={this.mainPage} />
          <Route exact path="/saved" render={this.savedPage} />
        </Switch>
      </Router>
    );
  }
  mainPage(props) {
    return(
      <Main articles={this.state.articles} save={this.saveArticle} delete={this.deleteArticle} showArticles={this.showArticles} {...props} />
    );
  }
  savedPage(props) {
    return(
      <Saved saved={this.state.saved} save={this.saveArticle} delete={this.deleteArticle} getSaved={this.getSaved} {...props} />
    );
  }
  scrapeSite() {
    fetch("/api/scrape")
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.showArticles();
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  showArticles() {
    fetch("/api/articles")
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.setState({
        articles: json
      });
      console.log("app setState has run");
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  saveArticle(id) {
    fetch(`/api/saved/${id}`, {
      method: "PUT"
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      let id = json._id;
      let currSate = this.state.saved;
      let newArticles = this.state.articles.filter(article => article._id !== id);
      this.setState({
        articles: newArticles,
        saved: [...currSate, json]
      });
      console.log("app setState has run");
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  deleteArticle(id) {
    fetch(`/api/saved/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
      let id = json._id;
      let newSaved = this.state.saved.filter(article => article._id !== id);
      this.setState({
        saved: newSaved
      });
      console.log("app setState has run");
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  getSaved() {
    fetch(`/api/saved/`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      this.setState({
        saved: json
      });
      console.log("app setState has run");
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
}

export default App;
