import React from 'react';
import Header from '../header/Header';
import Main from '../body/Main';
// import Footer from '../footer/Footer';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.scraper = this.scraper.bind(this);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Main scraper={this.scraper}/>
        {/* <Footer /> */}
      </div>
    );
  }
  scraper() {
    // fetch links using an api call
    fetch("/api/scrape").then(response => {
      if (!response.ok) {throw Error(response.statusText)};
      return response.json();
    }).then(data => {
      return data;
    });
  }

}

export default App;
