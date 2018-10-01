import React, { Component } from 'react';
import './App.css';
import {
    fetchZipByGeolocation,
    fetchForNav
} from './utils'
import axios from 'axios'

class App extends Component {
    state = {
        isVisible: true,
        googleApiStr: "",
        navigatorCoordsStr: "",
        navPositionStr: ""
    }

    determineLoc = async () => {
        const test = await fetchZipByGeolocation()
        const toString = JSON.stringify(test)
        return toString
    }

    render() {
        this.determineLoc()

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
        });

        return (
            <div className="App">
                <div className="logo"></div>
                <div className="nav"></div>
                <p className="App-intro">
                   Clique“ SIM” para ver o conteúdo.
		        </p>
            </div>
        );
    }
}

export default App;
