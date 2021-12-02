const path = require('path')
const express = require('express')
const hbs = require('hbs')
const weather = require('./utils/forecast')
const geolocation = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ankur Kundu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ankur Kundu',
        helpText: 'This is the help text'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location'
        })
    }
    geolocation.geocode(req.query.address, (error, {latitude, longitude,location} = {} ) => {
        if(error){
            return res.send({
                error
            })
        }
        weather.forecast(latitude, longitude, (error, {description, temperature, feelslike} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            const temp = 'It is '+description+'. Current temperature is '+temperature+' degree C and feels like '+feelslike+' degree C'
            return res.send({
                location: location,
                forecast:  temp
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ankur Kundu',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server started on port '+port+'.')
})