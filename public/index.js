$(document).ready(() => {

  let json;
  let $countries = $('#dropDown')
  let $newCountry = $('#newCountry')


  // populates <ul> of countries that exist in the back end
    $.ajax({
      type: 'GET',
      url: 'api/country',
      success: function(countries) {

        $.each(countries, function(i, name)  {
          $countries.append('<option>' + this.name + '</option>')
        })
        // adds or removes input fields based on dropDown selection
        $('#dropDown').change(function () {
          json = countries

          if ($countries.val() === "Add New Country") {
            $newCountry.empty()
            $('#subButton').empty()
            $newCountry.append('<input type="" id="AddNewCountry" placeholder="add country">')
            $newCountry.append('<input type="" id="AddNewRegion" placeholder="add region">')
            $('#subButton').append('<button type="button" id="submit">Submit</button>')
          } else if ($countries.val() === "--Select Country--") {
            $newCountry.empty()
            $('#subButton').empty()
          } else {
            $newCountry.empty()
            $('#subButton').empty()
            $newCountry.append('<input type="" id="AddNewRegion" placeholder="add region">')
            $('#subButton').append('<button type="button" id="submit">Submit</button>')
          }
          console.log(countries[0]['_id'])
        })
      }
    })
    // Posts data upon clicking submit button
    $('#subButton').on('click', $('#submit'), function() {
      let nameField = $('#AddNewCountry').val()
      if (nameField !== undefined && nameField !== "") {
        let country = {
          name: nameField
        }
        $.ajax({
          type: 'POST',
          url: 'api/country',
          data: country,
          success: function(res) {
            console.log(res)
            }
          })
        }
      })
      // creates table
      $.getJSON('/api/country', function(data){
        // console.log(data)
        let names = [];
        let tr;
        for(var i = 0; i < data.length; i++) {
          // $('#try').append(data[i]);
          names.push(data[i].name);
          // console.log(names);
        }
        for(var i = 0; i < names.length; i++) {
          tr = $('<tr/>');
          tr.append("<td>" + names[i] + "</td>")
          $('table').append(tr)
        }
      })
    })
