const Region = require('../models/coffee').region;
const Response = require('../utilities/response')

module.exports = function(router) {

router.route('/regions')

  .get(function(req, res) {
    Region.find((err, region) => {
      Response(err, res, region);
    })
  });

}
