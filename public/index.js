$(document).ready(() => {

  // not sure what this is doing. Not sure why first $
  // is purple, not orange.
  let $country = $('#country');
  let $countries = $('#listCountries')

  $.ajax({
    type: 'GET',
    url: 'api/country',
    success: function(countries) {
      $.each(countries, function(i, name)  {
        $countries.append('<li>country: ' + name.name + '</li>')
      })
    }

  })


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
