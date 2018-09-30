$(document).ready(() => {

  let $country = $('#country');
  let $countries = $('#dropDown')

  let $newCountry = $('#NewCountry')
  let $AddNew = $('#AddNewCountry')

  // populates <ul> of countries that exist in the back end
    $.ajax({
      type: 'GET',
      url: 'api/country',
      success: function(countries) {
        $.each(countries, function(i, name)  {
          $countries.append('<option>' + this.name + '</option>')
        })
      },
      complete: function() {
        $('#update').click(function () {
          if ($countries.val() === "Add New Country") {
            $newCountry.empty()
            $newCountry.append('<input type="" id="AddNewCountry" placeholder="add country">')
            $newCountry.append('<input type="" id="AddNewRegion" placeholder="add region">')
            $newCountry.append('<button type="button" id="submit">Submit</button>')

          } else {
            $newCountry.empty()
            $newCountry.append('<input type="" id="AddNewRegion" placeholder="add region">')
            $newCountry.append('<button type="button" id="submit">Submit</button>')
          }
        })
      }
    })

  // upon click, posts country object to back end
    // page reload will show newly added country to the <ul>
  // $("#submit").click(function() {
  //   let country = {
  //     name: $country.val()
  //   }
  //   $.ajax({
  //     type: 'POST',
  //     url: '/api/country',
  //     data: country,
  //     success: function(newCountry) {
  //       console.log(newCountry)
  //     }
  //   })
  // })


})
