import React from 'react';
import Header from '../header/Header';
import Main from '../body/Main';
// import Footer from '../footer/Footer';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.scraper = this.scraper.bind(this);
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    this.scraper()
    .then(res => this.setState({data: res}))
    .catch(err => console.log(err));
  }
  scraper = async () => {
    // fetch links using an api call
    const response = await fetch("/api/scrape");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Main scraper={this.state.data}/>
      </div>
    );
  }
}

export default App;
