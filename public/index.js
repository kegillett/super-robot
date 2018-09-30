$(document).ready(() => {

  let $country = $('#country');
  let $countries = $('#dropDown')

  let $newCountry = $('#newCountry')
  // let $AddNew = $('#AddNewCountry')


  // populates <ul> of countries that exist in the back end
    $.ajax({
      type: 'GET',
      url: 'api/country',
      success: function(countries) {
        $.each(countries, function(i, name)  {
          $countries.append('<option>' + this.name + '</option>')
        })
        $('#update').click(function () {
          if ($countries.val() === "Add New Country") {
            $newCountry.empty()
            $newCountry.append('<input type="" id="AddNewCountry" placeholder="add country">')
            $newCountry.append('<input type="" id="AddNewRegion" placeholder="add region">')
            $('#subButton').append('<button type="button" id="submit">Submit</button>')

          } else {
            $newCountry.empty()
            $newCountry.append('<input type="" id="AddNewRegion" placeholder="add region">')
            $('#subButton').append('<button type="button" id="submit">Submit</button>')
          }
        })
      }
    })
    $('#subButton').on('click', $('#submit'), function() {
      let country = {
        name: $('#AddNewCountry').val()
      }
      console.log(country)
      $.ajax({
        type: 'POST',
        url: 'api/country',
        data: country,
        success: function(res) {
          console.log(res)
          }
        })
      })
      $.getJSON('/api/country', function(data){
        console.log(data)
        let names = [];
        let tr;
        for(var i = 0; i < data.length; i++) {
          // $('#try').append(data[i]);
          names.push(data[i].name);
          console.log(names);
        }
        for(var i = 0; i < names.length; i++) {
          tr = $('<tr/>');
          tr.append("<td>" + names[i] + "</td>")
          $('table').append(tr)
        }
      })
    })
