const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/coffeeAPI', {useNewUrlParser: true});

var Country = require('./app/models/coffee').country;
var Region = require('./app/models/coffee').region;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/country')

  .post(function(req, res){
    var country = new Country();
    country.name = req.body.name;
    country.save(function(err){
      if (err)
        res.send(err);

        res.json({ message: 'Country Created!' });
    })
  })

  .get(function(req, res) {
    Country.find(function(err, country){
      if (err)
        res.send(err);

        res.json(country);
    });
  });


router.route('/country/:country_id')

  .get(function(req, res){
    Country.findById(req.params.country_id, function(err, country){
      if (err)
        res.send(err);
      res.json(country);
    })
  })

  .put(function(req, res){
    Country.findById(req.params.country_id, function(err, country){
      if(err)
        res.send(err);
      country.name = req.body.name;

      country.save(function(err){
        if(err)
          res.send(err);

        res.json({ message: 'Country Updated!'});
      })
    })
  })

  .delete(function(req, res){
    Country.remove({
      _id: req.params.country_id
    }, function(err, country) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });

    });
  });

  router.route('/country/:country_id/region')

  .post(function(req, res){
    var region = new Region();
    region.name = req.body.name;
    region.save(function(err){
      if (err)
        res.send(err);

        res.json({ message: 'Region Created!' });
    })
  })

  .put(function(req, res){
    Region.findById(req.params.region_id, function(err, region){
      if(err)
        res.send(err);
      region.name = req.body.name;
      // country.regions.push(region)
      //save the region
      region.save(function(err){
        if(err)
          res.send(err);
        res.json({ message: 'Region Updated!'});
      })
    });
  });


// Register our routes

app.use('/api', router);




//start the server
app.listen(port);
console.log('Magic happens on port' + port);
