
import logo from './logo.svg';
import './App.css';
import ReactMarkdown from 'react-markdown'

import React, { useState, useCallback, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'


function PortfolioNavItem(props){
  var jsx;
  if(props.selected===props.item){
    jsx= <div className="nav-col selected">{within()}</div>
  }
  else {
    
    jsx=<div className="nav-col">{within()}</div>
  }

  function within(){
    if(props.item){
      return(
          <img onClick={props.handleClick} className="nav-item" src={
          require(("./data/img/"+props.item.photos[0]))}/>
      );
    } else {
      return(
          <span onClick={props.handleClick}
                className="glyphicon glyphicon-home nav-item gi-3x" />
      )
    }
  }
  
  return jsx;
}

class PortfolioFocus extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: "",
      loaded:false,
    }
  }

  render() {
    if(!this.props.selected){
      return (
        
        <div className="row justify-content-center">
          <div className="col-12 "><img src={logo} className="App-logo" alt="logo" />
          <br />
          This portfolio is still in development
          <br />
          More portfolio items will be added shortly
          </div>
        </div>
      );
    } else if(!this.state.loaded) {
      ///THIS NEEDS TO BE FIXED THIS NEEDS TO BE FIXED
      var file = require("./data/oven/oven.md");
      console.log(file);
      var text = "";
      console.log("attempting to fetch");
      fetch("."+file).then(r => r.text()).then(r => {
        console.log("fetched");
        this.setState({text:r,loaded:true});
      })
      
      return (
        <div><img src={logo} className="App-logo" alt="logo" />
        <br></br>
        Fetching data</div>
        
      );
    } else {
      const gfm = require('remark-gfm');
      return(
        <div className="row justify-content-center">
          <div className="col-6 left">
            <ReactMarkdown plugins={[gfm]} source={this.state.text} />
          </div>
          <div className="col-2 vertical-flexbox">
          {this.props.selected.photos.map(photo => 
          <img className= "focus-photo" src={
            require(("./data/img/"+photo))} />
            )}
          </div>
        </div>
        
      )
    }
  }
  
}


class PortfolioNav extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selected: undefined,
    }
  }

  handleClick(item) {
    if(item) {
      this.setState({selected:item});
      this.props.handleClick(item);
    } else {
      this.setState({selected:undefined});
      this.props.handleClick(item);
    }
    console.log(this.state.selected);
  }

  render() {
    return(
      <nav className="nav-row">
                {this.props.portfolio.map(item => <PortfolioNavItem 
                                                    handleClick={() => this.handleClick(item)}
                                                    item={item}
                                                    selected={this.state.selected}/>)}
              </nav>
    );
  }
}

function App() {
  document.title = 'Nick Turner';

  const portfolio = [
    undefined,
    require('./data/oven/oven.json'),
    //require('./data/fogging/fogging.json')
  ];

  const [selected, set] = useState(0);

  const transitions = useTransition(selected, item => item, {
    from: { o: 0 },
    enter: { o: 1 },
    leave: { o: 2 },
    config: { duration: 1000 }
  })


  //let pages = this.props.portfolio.map(item => [])


  function handleClick(i) {
    set(i);
    console.log(i);
  }

  console.log(portfolio);
  return (
    
    <div className="App">{console.log("render called")}
      <PortfolioNav portfolio={portfolio}
                    handleClick={(i) => handleClick(i)}/>
      {transitions.map(({ item, props, key }) =>
       <animated.div style={{width:"100%", position: "absolute",opacity: props.o.interpolate([0, 0.5, 1, 1.5, 2], [0, 0, 1, 0, 0])
       }}key={key}><PortfolioFocus selected={item}/></animated.div>
      )}
    </div>
  );
}

export default App;