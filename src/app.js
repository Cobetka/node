const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Render views
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App para o Pras!',
        name: 'Cactus'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Cactus',
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Send Help',
        name: 'Cactus',
        text: 'This is helpless',
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode (req.query.address, (error, {latitude, longitude, location} ={} ) => {
        if (error) {
            return res.send({error})
        }

        forecast (latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
        })
        })
    })

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [],
    })
})

//Render 404 errors
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cactus',
        errorText: 'No help for you!',
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cactus',
        errorText: 'Page not found',
    })
});

//Server port
app.listen(port, () => {
    console.log('Server is listening on port ' + port)
});
