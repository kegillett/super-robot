// importing dependencies
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://localhost:27017/coffeeAPI', {
	useNewUrlParser: true
} );
//create a models of imported objects from cofee.js
var Country = require( './app/models/coffee' )
	.country;
var Region = require( './app/models/coffee' )
	.region;

app.use( bodyParser.urlencoded( {
	extended: true
} ) );
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
	} );
} );

//routes for API
//======================================================
//=======================================================
//link for list of countries
router.route( '/country' )
	//method to add country to the list
	.post( function ( req, res ) {
		//create new instance of country
		var country = new Country();
		//assign name to the country
		country.name = req.body.name;
		//save ew country
		country.save( function ( err ) {
			//if error
			if ( err )
				res.send( err );
			//on success return message
			res.json( {
				message: 'Country Created!'
			} );
		} )
	} )
	//method to get the list of all countries
	.get( function ( req, res ) {
		//find all countries and pass intance of country to the function
		Country.find( function ( err, country ) {
			//if error
			if ( err )
				res.send( err );
			//on success print out object that contains all countries
			res.json( country );
		} );
	} );

//=======================================================
//route to the specific country by id
router.route( '/country/:country_id' )
	//method that allows you information about specific country by id
	.get( function ( req, res ) {
		//find country by id and pass country instance to the function
		Country.findById( req.params.country_id, function ( err, country ) {
			//if error
			if ( err )
				res.send( err );
			//on success return country object
			res.json( country );
		} )
	} )
	//method that let you edit country object
	.put( function ( req, res ) {
		//find country by id,pass country instance to the function
		Country.findById( req.params.country_id, function ( err, country ) {
			//if error
			if ( err )
				res.send( err );
			//assign new name to the country
			country.name = req.body.name;
			//save edited instance of country
			country.save( function ( err ) {
				//if error
				if ( err )
					res.send( err );
				//return message on success
				res.json( {
					message: 'Country Updated!'
				} );
			} )
		} )
	} )
	//delete country from the list
	.delete( function ( req, res ) {
		Country.remove( {
			_id: req.params.country_id
		}, function ( err, country ) {
			//if error
			if ( err )
				res.send( err );
			//on success print a message
			res.json( {
				message: 'Successfully deleted'
			} );

		} );
	} );

//=============================================
//route to all regions of specific country
router.route( '/country/:country_id/regions' )
	//add new region to the list
	.post( function ( req, res ) {
		//find country by id
		Country.findById( req.params.country_id, function ( err, country ) {
			//on error
			if ( err )
				res.send( err );
			//create new instance of region
			let region = new Region();
			//assign name to the new region
			region.name = req.body.name;
			//add region to country.regions array
			country.regions.push( region )
			//save new instance of region
			region.save( function ( err ) {
				//if error
				if ( err )
					res.send( err );

			} )
			//save updated country
			country.save( function ( err ) {
				//if error
				if ( err )
					res.send( err );
				//print message on success
				res.json( {
					messsage: "Country Updated/Region Added"
				} )
			} )
		} )
	} )
	//get the list of regions of specific country
	.get( function ( req, res ) {
		//find country by id
		Country.findById( req.params.country_id, function ( err, country ) {
				//if error
				if ( err )
					res.send( err );
			} )
			//populate information about name,so it will print out
			//name and id of the object
			.populate( 'regions', 'name' )
			//execute and pass country instance
			.exec( function ( err, country ) {
				//if error
				if ( err )
					res.send( err )
				//on success print out array of regions to the specific country
				res.json( country.regions )
			} )


	} )

//======================================================
//route to the specific region of specific country
router.route( '/country/:country_id/:region_id' )
	//edit information about specific region of specific country
	.put( function ( req, res ) {
		//find region by id and pass instance of region to the function
		Region.findById( req.params.region_id, function ( err, region ) {
			//if error
			if ( err )
				res.send( err );
			//assign new name of the region
			region.name = req.body.name;
			//save instance of the region
			region.save( function ( err ) {
				//if error
				if ( err )
					res.send( err );
				//print message on success
				res.json( {
					message: 'Region Updated!'
				} );
			} )
		} )
	} )
	//delete specific region in specific country
	.delete( function ( req, res ) {
		//delete one region by id
		Region.deleteOne( {
			_id: req.params.region_id
		}, function ( err, region ) {
			//if error
			if ( err )
				res.send( err );
		} );
		//find country by id and pass country instance to the function
		Country.findById( req.params.country_id, function ( err, country ) {
			//if error
			if ( err )
				res.send( err )
			//loop through the array of regions in country
			for ( var i = 0; i < country.regions.length; i++ ) {
				//if we found desired region in array
				if ( country.regions[ i ] == req.params.region_id ) {
					//cut out one element( that region) on index i
					//i where to start,1 how many to delete
					country.regions.splice( i, 1 )
				}
			}
			//save edited country model
			country.save( function ( err ) {
				//if error
				if ( err )
					res.send( err );
				//on success print out message
				res.json( {
					messsage: "Country Updated/Region Added"
				} )
			} )
		} )
	} )
//==========================================
//=========================================
// Register our routes
app.use( '/api', router );

//start the server
app.listen( port );
console.log( 'Magic happens on port' + port );
