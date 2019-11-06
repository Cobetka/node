const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const tempURL = 'https://api.darksky.net/forecast/6be88f2d8a6f60b1bc3f47bc9477d12e/'+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) +'?units=si'
    request({url : tempURL, json: true, }, (error, response) => {
        if (error) {
            callback('Unable to connect !weather!', undefined)
        } else if (response.body.error) {
            callback('unable do find !weather!', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' Temperature: ' + response.body.currently.temperature + ' Max temperature :' + response.body.daily.data[0].temperatureHigh + ' Min temperature: ' + response.body.daily.data[0].temperatureLow + '. Rain: ' + response.body.currently.precipProbability + ' %')
        }
    })
}


module.exports = forecast
