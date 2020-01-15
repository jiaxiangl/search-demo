import React, {Component} from 'react';
import './App.css';
import Main from './components/main'

import NavigationBar from './components/NavigationBar/navigationBar'


class App extends Component {
  render(){
  return (
    <div className="app">
      <NavigationBar/>
      <Main/>
    </div>
  );
  }
}

export default App;
