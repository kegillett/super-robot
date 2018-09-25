const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/coffeeAPI', {useNewUrlParser: true});
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
router.route('/coffee')

  .post(function(req, res){
    var coffee = new Coffee();
    coffee.name = req.body.name;
    coffee.save(function(err){
      if (err)
        res.send(err);
    })
  })
// Register our routes

app.use('/api', router);

var coffee = require('./app/models/coffee');


//start the server
app.listen(port);
console.log('Magic happens on port' + port);
