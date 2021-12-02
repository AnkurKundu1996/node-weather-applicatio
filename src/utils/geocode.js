const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5rdXJ0dWthaSIsImEiOiJja3didzh0YXYyeXRxMm9wODVjN3k4dGthIn0.ns94T3s70V5k_tlSCJmZsw'
    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to fetch geo-location!!!', undefined)
        }else if(body.message === 'Forbidden' || body.message === 'Not Found' || body.features.length === 0){
            callback('Unable to find location!!!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode
}