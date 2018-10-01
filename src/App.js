import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {fetchZipByGeolocation} from './utils'

class App extends Component {
	determineLoc = async () => {
		const test = await fetchZipByGeolocation()
		const toString = JSON.stringify(test)
		console.log('toString', toString)
		return toString
	}
  render() {
	  const test = this.determineLoc()
	  console.log(test)
	return (
	  <div className="App">
		<header className="App-header">
		  <img src={logo} className="App-logo" alt="logo" />
		  <h1 className="App-title">Welcome to React</h1>
		</header>
		<p className="App-intro">
		  To get started, edit <code>src/App.js</code> and save to reload.
		</p>
	  </div>
	);
  }
}

export default App;
