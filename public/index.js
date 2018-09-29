$(document).ready(() => {

  // not sure what this is doing. Not sure why first $
  // is purple, not orange.
  let $country = $('#country');


  $("#submit").click(function() {
    let country = {
    name: $country.val()
    }

    console.log(country)

    $.ajax({
      type: 'POST',
      url: '/api/country',
      data: country,
      success: function(newCountry) {
        console.log(newCountry)
      }
    })
  })
})
