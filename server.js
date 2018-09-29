// importing dependencies
const express = require( 'express' );
const path = require('path')
const app = express();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost:27017/coffeeAPI', {
	useNewUrlParser: true
	});
app.use(express.static(path.join(__dirname, 'public')));
app.use( bodyParser.urlencoded( {
	extended: true
	}));
app.use( bodyParser.json() );

const port = process.env.PORT || 8080;
const router = express.Router();
// middleware starts here
// function fired with every API call
router.use( function ( req, res, next ) {
	console.log( 'Something is happening.' );
	next();
} );
//catch all routes
router.get( '/', function ( req, res ) {
	res.json( {
		message: 'hooray! welcome to our api!'
	});
});
// country routes
const countryRoutes = require('./app/routes/country.js')
countryRoutes(router)
// region routes
// const regionRoutes = require('./app/routes/region.js')
// regionRoutes(router)
// Register our routes
app.use( '/api', router );
//start the server
app.listen( port );
console.log( 'Magic happens on port' + port );
