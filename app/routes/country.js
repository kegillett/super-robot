const Country = require( '../models/coffee.js' ).country;
const Region = require( '../models/coffee.js' ).region;

module.exports = function(router) {
//link for list of countries
router.route( '/country' )
	.post( function ( req, res ) {
		var country = new Country();
		country.name = req.body.name;
		country.save( function ( err ) {
			if ( err )
				res.send( err );
			res.json( {
				message: 'Country Created!'
			} );
		} )
	} )
	//method to get the list of all countries
	.get( function ( req, res ) {
		Country.find( function ( err, country ) {
			if ( err )
				res.send( err );
			res.json( country );
		} );
	} );

//route to the specific country by id
router.route( '/country/:country_id' )
	//method that allows you information about specific country by id
  .get( function ( req, res ) {
		Country.findById( req.params.country_id, function ( err, country ) {
			if ( err )
				res.send( err );

			res.json( country );
		} )
	} )
	//method that let you edit country object
	.put( function ( req, res ) {
		Country.findById( req.params.country_id, function ( err, country ) {
			if ( err )
				res.send( err );
			country.name = req.body.name;
			country.save( function ( err ) {
				if ( err )
					res.send( err );
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
			if ( err )
				res.send( err );
			res.json( {
				message: 'Successfully deleted'
			} );

		} );
	} );

//route to all regions of specific country
router.route( '/country/:country_id/regions' )
	//add new region to the list
	.post( function ( req, res ) {
		Country.findById( req.params.country_id, function ( err, country ) {
			if ( err )
				res.send( err );
			let region = new Region();
			region.name = req.body.name;
			country.regions.push( region )
			region.save( function ( err ) {
				if ( err )
					res.send( err );

			} )
			country.save( function ( err ) {
				if ( err )
					res.send( err );
				res.json( {
					messsage: "Country Updated/Region Added"
				} )
			} )
		} )
	} )
	//get the list of regions of specific country
	.get( function ( req, res ) {
		Country.findById( req.params.country_id, function ( err, country ) {
				if ( err )
					res.send( err );
			} )
			//populate information about name,so it will print out
			//name and id of the object
			.populate( 'regions', 'name' )
			//execute and pass country instance
			.exec( function ( err, country ) {
				if ( err )
					res.send( err )
				res.json( country.regions )
			} )


	} )

//route to the specific region of specific country
router.route( '/country/:country_id/:region_id' )
	//edit information about specific region of specific country
	.put( function ( req, res ) {
		Region.findById( req.params.region_id, function ( err, region ) {
			if ( err )
				res.send( err );
			region.name = req.body.name;
			region.save( function ( err ) {
				if ( err )
					res.send( err );
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
			if ( err )
				res.send( err );
		} );
		Country.findById( req.params.country_id, function ( err, country ) {
			if ( err )
				res.send( err )
			for ( var i = 0; i < country.regions.length; i++ ) {
				if ( country.regions[ i ] == req.params.region_id ) {
					country.regions.splice( i, 1 )
				}
			}
			country.save( function ( err ) {
				if ( err )
					res.send( err );
				res.json( {
					messsage: "Country Updated/Region Deleted"
				} )
			} )
		} )
	} )

}
