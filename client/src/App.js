import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Saved from './components/Saved';
import './App.css';
import GRAB from './utils/API';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      saved: []
    }
  }
  mainPage = (props) => {
    return(
      <Main scrape={this.scrapeSite} articles={this.state.articles} save={this.saveArticle} delete={this.deleteArticle} showArticles={this.showArticles} {...props} />
    );
  }
  savedPage = (props) => {
    return(
      <Saved saved={this.state.saved} deleteArticle={this.deleteArticle} getSaved={this.getSaved} {...props} />
    );
  }
  scrapeSite = () => {
    GRAB("/api/scrape", "GET")
    .then(json => {
      this.showArticles(json);
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  showArticles = (json) => {
    this.setState({
      articles: json
    });
  }
  saveArticle = (id) => {
    GRAB(`/api/saved/${id}`, "GET")
    .then(json => {
      this.getArticles();
      this.getSaved();
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  deleteArticle = id => {
    GRAB(`/api/saved/${id}`, "DELETE")
    .then(json => {
      this.getSaved();
      this.getArticles();
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  getArticles = () => {
    GRAB("/api/articles", "GET")
    .then(json => {
      this.setState({
        articles: json
      });
    })
    .catch(err => console.log(err));
  }
  getSaved = () => {
    GRAB(`/api/saved/`, "GET")
    .then(json => {
      this.setState({
        saved: json
      });
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  componentDidMount = () => {
    this.scrapeSite();
    this.getSaved();
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
}

export default App;
