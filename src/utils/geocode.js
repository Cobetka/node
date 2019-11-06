const request = require('request')

const geocode = (adress, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoiY29iZXRrYSIsImEiOiJjazJrYzlnOW0wZTY4M2pubzk5ZmthMXlwIn0.2hzoZJx4ngOMVmHLU58bEA'
    request({url : geoURL, json: true, }, (error, response) => {
        if (error) {
            callback('Unable to connect !geo!', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable do find !geo!', undefined)
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode
