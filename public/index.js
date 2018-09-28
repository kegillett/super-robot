$(document).ready(() => {
  $("#submit").click(function(){
    $.ajax({
      url: "/api/country/",
      success: (res) => {
        $.post( { 'country': 'Egypt' } );
        console.log(res);
      }
    })
  })
})
