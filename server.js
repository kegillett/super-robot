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

  router.route('/country/:country_id/regions')

  .post(function(req, res){
    Country.findById(req.params.country_id, function(err, country){
      if(err)
        res.send(err);
        let region = new Region();
    region.name = req.body.name;
     country.regions.push(region)
    region.save(function(err){
      if (err)
        res.send(err);

    })
    country.save(function(err){
      if (err)
        res.send(err);
        res.json({messsage: "Country Updated/Region Added"})
    })
        })
    })

  .get(function(req, res){
    Country.findById(req.params.country_id, function(err, country){
      if(err)
        res.send(err);
    }).populate('regions', 'name').exec(function(err, country){
      if(err)
        res.send(err)
      res.json(country.regions)
    })


  })
  router.route('/country/:country_id/:region_id')

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
    })
  })

  .delete(function(req, res){
    Region.remove({
      _id: req.params.region_id
    }, function(err, region) {
      if (err)
        res.send(err);




    });
    // Country.findById(req.params.country_id, function(err, country) {
    //   if (err)
    //     res.send(err)
    //   for (var i = 0; i < country.regions.length; i++) {
    //     if (country.regions[i] == req.params.region_id) {
    //       country.regions.splice(i, 1)
    //       console.log(i)
      //   }
      // }
    // _id: req.params.region_id
      // });
Country.findById(req.params.country_id, function(err, country) {
  if (err)
    res.send(err)
    country.regions.deleteOne({_id: req.params.region_id},
    function(err, region) {
      if (err)
        res.send(err)
    })
})



      Country.findById(req.params.country_id, function(err, country) {
       country.save(function(err){
          if (err)
            res.send(err);
            res.json({messsage: "Country Updated/Region Added"})
        })
      })
    });


// Register our routes

app.use('/api', router);




//start the server
app.listen(port);
console.log('Magic happens on port' + port);
