const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5ee26661f85b50fb83ff9c009a1f5ecf&query=' + encodeURI(latitude).replace(',', '.') + ',' + encodeURI(longitude).replace(',', '.') + '&units=m'
    console.log(url)
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather app', undefined)
        } else if (body.error) {
            console.log('Unable to find location', undefined)
        } else {
            callback(undefined,
                ('The temperature is: ' + body.current.temperature + ' but it feels like: ' + body.current.feelslike + '. The pressure is: ' + body.current.pressure))
        }
    })
}

module.exports = forecast