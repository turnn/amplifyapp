import React from 'react';
import logo from './logo.svg';
import './App.css';


function PortfolioNavItem(props){

  return(
    <div className="portfolio-photo-container"><img onClick={e => console.log("Clicked")} className="portfolio-nav-small" src={
      require(("./data/img/"+props.item.photos[0]))}/></div>
  );
}

function App() {
  document.title = 'Nick Turner';

  var portfolio = [
    require('./data/oven/oven.json'),
    require('./data/oven/oven.json'),
    require('./data/oven/oven.json'),
    require('./data/oven/oven.json'),
    // require('./data/fogging/fogging.json')
  ];

  console.log(portfolio);
  return (
    
    <div className="App">
      <header className="App-header">
        <div className="presentation-main">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="presentation-nav">
          {portfolio.map(item => <PortfolioNavItem item={item}/>)}
        </div> 
        <p>
          In development
          {console.log(portfolio)}
        </p>
      </header>
    </div>
  );
}

export default App;
