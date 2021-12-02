const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6bac58a3537b414610b66e418ad64063&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to fetch weather status!!!', undefined)
        }else if(body.error){
            callback('Unable to find location!!!', undefined)
        }else{
            callback(undefined, {
                description: body.current.weather_descriptions[0] ,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })

        }
    })
}

module.exports = {
    forecast
}