// AIzaSyCrAksqLxq5nUi-QNrRUl05Tq7m1_GMDDI
import axios from 'axios'
/**
 * Fetch user zip code using Geolocation.
 * @returns {string} Result is a zip code
 */
export async function fetchZipByGeolocation() {
    try {
        const apiKey = 'AIzaSyCrAksqLxq5nUi-QNrRUl05Tq7m1_GMDDI' // My key
        const response = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`)
        const coordinates = response.data
        const {
            lat,
            lng
        } = coordinates.location

        console.log('coordinates', coordinates)
        /* eslint-disable-next-line max-len */
        const zipResponse = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=postal_code&key=${apiKey}`)
        console.log('zipResponse', zipResponse)
        return zipResponse
    } catch (ex) {
        return new Error(ex)
    }
}

export async function fetchForNav(lat, lng) {
    try {
        const apiKey = 'AIzaSyCrAksqLxq5nUi-QNrRUl05Tq7m1_GMDDI' // My key
        const zipNavResponse = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=postal_code&key=${apiKey}`)
        console.log('zipResponse', zipNavResponse)
        return zipNavResponse
    } catch (ex) {
        return new Error(ex)
    }
}