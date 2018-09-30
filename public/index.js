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

//
//   $.getJSON(url , function(data) {
//     var tbl_body = document.createElement("tbody");
//     var odd_even = false;
//     $.each(data, function() {
//         var tbl_row = tbl_body.insertRow();
//         tbl_row.className = odd_even ? "odd" : "even";
//         $.each(this, function(k , v) {
//             var cell = tbl_row.insertCell();
//             cell.appendChild(document.createTextNode(v.toString()));
//         })
//         odd_even = !odd_even;
//     })
//     $("#target_table_id").appendChild(tbl_body);
// });
