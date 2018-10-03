$(document).ready(() => {

  let json;
  let countryID;
  let $countries = $('#dropDown')
  let $newCountry = $('#newCountry')
  let $button = $('#subButton')

// populates <ul> of countries that exist in the back end
    $.ajax({
      type: 'GET',
      url: 'api/country',
      success: (countries) => {
        json = countries
        $.each(countries, function(i, name) {
          $countries.append('<option>' + this.name + '</option>')
        })
      }
    })
// populates input boxes based on dropdown selection
    $('#dropDown').change( () => {
      for (var i = 0; i < json.length; i++) {
        if (json[i]['name'] === $countries.val()) {
          countryID = json[i]['_id']
        }
      }
      if ($countries.val() === "Add New Country") {
        $newCountry.empty().append('<input type="" id="AddNewCountry" placeholder="add country">')
        .append('<input type="" id="AddNewRegion" placeholder="add region">')
        $button.empty().append('<button type="button" id="submit">Submit</button>')
      } else if ($countries.val() === "--Select Country--") {
        $newCountry.empty()
        $button.empty()
      } else {
        $newCountry.empty()
        $button.empty()
        $newCountry.append('<input type="" id="AddNewRegion" placeholder="add region">')
        $button.append('<button type="button" id="submit">Submit</button>')
      }
    })

    // add error for trying to duplicate countries


// Posts data upon clicking submit button
    $('#subButton').on('click', $('#submit'), () => {
      let nameField = $('#AddNewCountry').val()
      let regField = $('#AddNewRegion').val()
      if (nameField !== undefined && nameField !== '') {
        let country = {
          name: nameField
        }
        $('#errors').empty()
        $.ajax({
          type: 'POST',
          url: 'api/country',
          data: country,
          success: (res) => {
            console.log(res)
            }
          })
        }
        else if (nameField === "") {
          $('#errors').empty().append('<h4>please enter a country, first.</h4>')
        }
        else if (nameField == undefined && regField.length > 0) {
          let region = {
            name: regField
          }
// post region name to country
          $.ajax({
            type: 'POST',
            url: `api/country/${countryID}/regions`,
            data: region,
            success: (res) => {
              console.log(res)
              for (var i = 0; i < json.length; i++) {
                if (json[i]['_id'] === countryID) {
                  json[i]['regions'].push(region)
                }
              }
            }
          })
        }
      })
// creates table
    $.getJSON('/api/country', (data) => {
        let tr;
        console.log(data)
        for(var i = 0; i < data.length; i++) {
          tr = $('<tr>');
          tr.append("<td>" + data[i].name + "</td>")
          $('table').append(tr)
          for (var j = 0; j < data[i]['regions'].length; j++) {
            tr.append("<td>" + data[i]['regions'][j] + "</td>")

          }
        }
      })
    });
