import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
// import Saved from './components/Saved';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
    this.scrapeSite = this.scrapeSite.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.getSaved = this.getSaved.bind(this);
    this.showArticles = this.showArticles.bind(this);
  }
  componentDidMount() {
    this.scrapeSite();
    this.showArticles();
  }
  render() {
    return (
      <>
        <Navbar />
        <Main articles={this.state.articles} />
      </>
    );
  }
  scrapeSite() {
    fetch("/api/scrape")
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
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
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  saveArticle(id) {
    fetch(`/api/saved/${id}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
  deleteArticle(id) {
    fetch(`/api/saved/${id}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
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
      return json;
    })
    .catch(error => {
      throw new Error("the error is " + error);
    });
  }
}

export default App;
