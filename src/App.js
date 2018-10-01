import React, { Component } from 'react';
import './App.css';
import {
    fetchGoogleForLatLng,
    getReverseGeo,
    getReverseGeoNav,
    postData,
    getAll
} from './utils'
import axios from 'axios'

class App extends Component {
    state = {
        token: "",
        google_coords: "",
        google_location: "",
        navigator_coords: "",
        navigator_location: ""
    }
    
    async componentDidMount () {
      const signInResponse = await this.handleMockSignIn()
      const fetchResp = await this.getGoogleFetchLongLat()
      const {lat, lng} = fetchResp.location
      await this.getGoogleReverse(lat, lng)
      await this.loadPosition();
      
      
      const {
        google_coords,
        google_location,
        navigator_coords,
        navigator_location
      } = this.state
      
      const data = {
        coordinate: {
          google_coords,
          google_location,
          navigator_coords,
          navigator_location
        }
      }
      
      const { token } = this.state
      await postData(token, data)
      
      const response = await getAll(token, data)
      
      console.log(response)
      
      this.interval = setInterval(() => this.fireUpdate(), 300000);
      return;
    }
    
    fireUpdate = async () => {
      const load = await this.loadPosition();
      const {
        google_coords,
        google_location,
        navigator_coords,
        navigator_location
      } = this.state
      
      const data = {
        coordinate: {
          google_coords:"",
          google_location:"",
          navigator_coords: navigator_coords,
          navigator_location: navigator_location
        }
      }
      
      const { token } = this.state
      await postData(token, data)
      
      const response = await getAll(token, data)
      console.log(response)
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    
    
    loadPosition = async () => {
        try {
          const position = await this.getCurrentPosition();
          const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed} = position.coords
          const coords = {
            accuracy,
            altitude,
            altitudeAccuracy,
            heading,
            latitude,
            longitude,
            speed
          }
          // const coords = JSON.stringify(coordsConstructor)
          const timestamp = position.timestamp
          const navigatorCoords = {
            navigatorData: {
              coords,
              timestamp
            }
          }
          
          const navigator_coords = JSON.stringify(navigatorCoords)
          //
          const navLocationData = await this.getGoogleReverse(latitude, longitude)
          const navigator_location = JSON.stringify(navLocationData)

          this.setState({
            navigator_coords,
            navigator_location
          });
          
          
        } catch (error) {
          console.log(error);
        }
      };

    getCurrentPosition = (options = {}) => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };
    
    handleMockSignIn = async () => {
      const data = {
        credentials: {
          email: "z@z.com",
          password: "z"
        }
      }
      
      const response = await axios.post('/sign-in', data)
      const { token } = response.data.user
      
      this.setState({
        token
      })

      // axios.defaults.headers.common['Authorization'] = `Token token=${token}`;
      return token;
    }
    
    getGoogleReverse = async (lat, lng) => {
      const response = await getReverseGeo(lat, lng)
      const {data} = response
      const google_location = JSON.stringify(data)
      this.setState({
        google_location
      })
      
      return response
    }
    
    getGoogleFetchLongLat = async () => {  
        const googleFetchLatLong = await fetchGoogleForLatLng()
        const google_coords = JSON.stringify(googleFetchLatLong)
        
        this.setState({
          google_coords
        })

        return googleFetchLatLong
    }

    render() {
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
