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

// ...

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
  let randomBeer = await punkAPI.getRandom();
  console.log(randomBeer);
  res.render('randomBeers.hbs', { randomBeer: randomBeer });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
