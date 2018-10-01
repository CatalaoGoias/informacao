// AIzaSyCrAksqLxq5nUi-QNrRUl05Tq7m1_GMDDI
import axios from 'axios'
/**
 * Fetch user zip code using Geolocation.
 * @returns {string} Result is a zip code
 */
export async function fetchGoogleForLatLng() {
    try {
        const apiKey = 'AIzaSyCrAksqLxq5nUi-QNrRUl05Tq7m1_GMDDI' // My key
        const response = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`)
        const coordinates = response.data

        return coordinates
    } catch (ex) {
        return new Error(ex)
    }
}

export async function getReverseGeo(lat, lng) {
    try {
        const apiKey = 'AIzaSyCrAksqLxq5nUi-QNrRUl05Tq7m1_GMDDI' // My key
        if (typeof lat !== "undefined" && typeof lng !== "undefined") {
            const zipNavResponse = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`)
            return zipNavResponse
        }
    } catch (ex) {
        return new Error(ex)
    }
}

export async function postData(token, data) {
  console.log(token)
  const options = {
    method: 'POST',
    headers: { 'Authorization': `Token token=${token}` },
    data: data,
    url: `${axios.defaults.baseURL}/coordinates`
  };
  const response = await axios(options);
  return response
} 

export async function getAll(token) {
  try {
    const options = {
      method: 'GET',
      headers: { 'Authorization': `Token token=${token}` },
      url: `${axios.defaults.baseURL}/coordinates`
    };
    const response = await axios(options);
    return response
  } catch (err) {
    return err
  }
} 

export async function getReverseGeoNav(position) {
    try {
        const coordsToJson = JSON.stringify(position)
        console.log(coordsToJson)
        const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed} = position.coords
        const apiKey = 'AIzaSyCrAksqLxq5nUi-QNrRUl05Tq7m1_GMDDI' // My key
        if (typeof latitude !== "undefined" && typeof longitude !== "undefined") {
            const zipNavResponse = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
            const zipNavJson = JSON.stringify(zipNavResponse)
            const data = {
              coordinate: {
                track_type: "navigator",
                coords: coordsToJson,
                location: zipNavJson
              }
            }
            
            console.log(data)
            return zipNavResponse
        }
    } catch (ex) {
        return new Error(ex)
    }
}