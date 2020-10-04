const express = require('express')
const path = require('path')
const hbs = require('hbs')
const favicon = require('serve-favicon')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for express app
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and the directory
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialPath)

// Setup static directory to serve 
app.use(express.static(publicDirectory))
app.use(favicon(path.join(__dirname, '../public/img/weather.png')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Michał M. Fedorczyk'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Michał M. Fedorczyk'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Michał M. Fedorczyk',
        message: 'This is the best Weather App'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michał M. Fedorczyk',
        errorMessage: 'No Help article found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michał M. Fedorczyk',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server started correctly at port 3000')
})