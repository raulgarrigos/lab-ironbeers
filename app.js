const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  let imgSrc = '/images/beer.png';
  res.render('index.hbs', {
    imgSrc
  });
});

app.get('/beers', async (req, res) => {
  try {
    let beer = await punkAPI.getBeers();
    res.render('beers.hbs', { beer });
  } catch (err) {
    console.log(err);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    let randomBeer = await punkAPI.getRandom();
    res.render('randomBeers.hbs', { randomBeer });
  } catch (err) {
    console.log(err);
  }
});

app.get('/beers/:beerId', async (req, res) => {
  try {
    let id = req.params.beerId.substring(req.params.beerId.indexOf('-') + 1);
    let oneBeer = await punkAPI.getBeer(id);
    res.render('detailedBeer.hbs', {
      oneBeer
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
